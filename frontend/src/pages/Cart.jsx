import React, { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Cart() {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const { data } = await api.get('/cart');
      setCart(data);
    } catch (err) {
      console.error(err);
      setCart([]);
    }
  };

  const increaseQuantity = async (itemId) => {
    await api.post("/cart/increase", { itemId });
    fetchCart();
  };

  const decreaseQuantity = async (itemId) => {
    await api.post("/cart/decrease", { itemId});
    fetchCart();
  };

useEffect(() => { fetchCart(); }, []);

  const removeItem = async (itemId) => {
    try {
      await api.post('/cart/remove', { itemId });
      fetchCart();
    } catch (err) {
      alert('Failed to remove');
    }
  };

   const total = cart.reduce((s, it) => s + (it.price * (it.quantity || 1)), 0);

  return (
    <div className="container">
      <h2 className="mb-3">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="alert alert-info">Your cart is empty</div>
      ) : (
        <>
          <div className="row">
            {cart.map(c => (
              <div key={c.itemId} className="col-md-4 mb-3">
                <div className="card">
                  <img src={c.image || 'https://via.placeholder.com/300'} className="card-img-top" alt={c.name} />
                  <div className="card-body">
                    <h5>{c.name}</h5>
                    <p>Qty: {c.quantity}</p>
                    <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => decreaseQuantity(c.itemId)}>−</button>
                    <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => increaseQuantity(c.itemId)}>+</button>
                    <p className="fw-bold">${c.price}</p>                    
                    <button className="btn btn-danger" onClick={() => removeItem(c.itemId)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h4>Total: ${total.toFixed(2)}</h4>
          </div>
        </>
      )}
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import api from "../api/axios";

// export default function Cart() {
//   const [cart, setCart] = useState(null);

//   const fetchCart = async () => {
//     try {
//       const res = await api.get("/cart");
//       setCart(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const increaseQuantity = async (id) => {
//     await api.post("/cart/increase", { itemId: id });
//     fetchCart();
//   };

//   const decreaseQuantity = async (id) => {
//     await api.post("/cart/decrease", { itemId: id });
//     fetchCart();
//   };

//   const removeItem = async (id) => {
//     await api.post("/cart/decrease", { itemId: id }); // decrease until remove
//     fetchCart();
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   if (!cart) return <div className="container mt-5">Loading...</div>;

//   return (
//     <div className="container mt-5">
//       <h3>Your Cart</h3>
//       {cart.items.length === 0 ? (
//         <p>No items in cart</p>
//       ) : (
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th>Item</th>
//               <th>Quantity</th>
//               <th>Price</th>
//               <th>Total</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cart.items.map((i) => (
//               <tr key={i.itemId._id}>
//                 <td>{i.itemId.name}</td>
//                 <td>
//                   <div className="d-flex align-items-center">
//                     <button
//                       className="btn btn-sm btn-outline-secondary me-2"
//                       onClick={() => decreaseQuantity(i.itemId._id)}
//                     >
//                       −
//                     </button>
//                     <span>{i.quantity}</span>
//                     <button
//                       className="btn btn-sm btn-outline-secondary ms-2"
//                       onClick={() => increaseQuantity(i.itemId._id)}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </td>
//                 <td>₹{i.itemId.price}</td>
//                 <td>₹{i.itemId.price * i.quantity}</td>
//                 <td>
//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => removeItem(i.itemId._id)}
//                   >
//                     Remove
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }