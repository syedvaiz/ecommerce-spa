const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Item = require('../models/Item');

// Helper: return cart items in frontend-friendly shape
async function getPopulatedCart(userId) {
  const user = await User.findById(userId).populate('cart.itemId');
  if (!user) return [];
  return (user.cart || []).map(ci => ({
    itemId: ci.itemId ? ci.itemId._id.toString() : ci.itemId.toString(),
    name: ci.itemId ? ci.itemId.name : 'Item',
    price: ci.itemId ? ci.itemId.price : 0,
    quantity: ci.quantity,
    image: ci.itemId ? ci.itemId.image : ''
  }));
}

// GET /api/cart  (get user's cart)
router.get('/', auth, async (req, res) => {
  try {
    const items = await getPopulatedCart(req.user.id);
    return res.json(items);
  } catch (err) {
    console.error('GET /api/cart error', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/cart/add  { itemId, quantity }
router.post('/add', auth, async (req, res) => {
  try {
    const { itemId, quantity = 1 } = req.body;
    if (!itemId) return res.status(400).json({ message: 'itemId required' });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const existing = user.cart.find(ci => ci.itemId.toString() === itemId.toString());
    if (existing) existing.quantity += Number(quantity);
    else user.cart.push({ itemId, quantity: Number(quantity) });

    await user.save();

    const items = await getPopulatedCart(req.user.id);
    return res.json(items);
  } catch (err) {
    console.error('POST /api/cart/add error', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/cart/increase  { itemId }
router.post('/increase', auth, async (req, res) => {
  try {
    const { itemId } = req.body;
    if (!itemId) return res.status(400).json({ message: 'itemId required' });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const item = user.cart.find(ci => ci.itemId.toString() === itemId.toString());
    if (item) {
      item.quantity += 1;
      await user.save();
    } else {
      // If not present, push it with quantity 1
      user.cart.push({ itemId, quantity: 1 });
      await user.save();
    }

    const items = await getPopulatedCart(req.user.id);
    return res.json(items);
  } catch (err) {
    console.error('POST /api/cart/increase error', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/cart/decrease  { itemId }
router.post('/decrease', auth, async (req, res) => {
  try {
    const { itemId } = req.body;
    if (!itemId) return res.status(400).json({ message: 'itemId required' });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const item = user.cart.find(ci => ci.itemId.toString() === itemId.toString());
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        // remove if quantity would go to 0
        user.cart = user.cart.filter(ci => ci.itemId.toString() !== itemId.toString());
      }
      await user.save();
    }
    const items = await getPopulatedCart(req.user.id);
    return res.json(items);
  } catch (err) {
    console.error('POST /api/cart/decrease error', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/cart/remove  { itemId }
router.post('/remove', auth, async (req, res) => {
  try {
    const { itemId } = req.body;
    if (!itemId) return res.status(400).json({ message: 'itemId required' });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.cart = user.cart.filter(ci => ci.itemId.toString() !== itemId.toString());
    await user.save();

    const items = await getPopulatedCart(req.user.id);
    return res.json(items);
  } catch (err) {
    console.error('POST /api/cart/remove error', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
