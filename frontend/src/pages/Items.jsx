// src/pages/Items.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Items() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [search, setSearch] = useState('');

  const fetchItems = async () => {
    try {
      const params = {};
      if (category) params.category = category;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      if (search) params.search = search;
      const { data } = await api.get('/items', { params });
      setItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const addToCart = async (id) => {
    try {
      await api.post('/cart/add', { itemId: id, quantity: 1 });
      alert('Added to cart');
    } catch (err) {
      alert('Login required or error');
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Products</h2>
        <div className="d-flex gap-2">
          <input className="form-control" placeholder="search" value={search} onChange={e => setSearch(e.target.value)} />
          <input className="form-control" placeholder="category" value={category} onChange={e => setCategory(e.target.value)} />
          <input type="number" className="form-control" placeholder="min price" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
          <input type="number" className="form-control" placeholder="max price" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
          <button className="btn btn-secondary" onClick={fetchItems}>Filter</button>
        </div>
      </div>

      <div className="row">
        {items.map(it => (
          <div key={it._id} className="col-md-3 mb-4">
            <div className="card h-100">
              <img src={it.image || 'https://via.placeholder.com/300'} className="card-img-top" alt={it.name} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{it.name}</h5>
                <p className="card-text text-muted">{it.category}</p>
                <p className="card-text fw-bold">${it.price}</p>
                <button className="btn btn-success mt-auto" onClick={() => addToCart(it._id)}>Add to cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
