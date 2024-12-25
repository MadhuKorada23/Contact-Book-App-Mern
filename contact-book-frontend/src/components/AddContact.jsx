 



import React, { useState } from 'react';
import { addContact } from '../api';
import { useNavigate } from 'react-router-dom';
import './AddContact.css';

const AddContact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contact = { name, email, phone };
    await addContact(contact);
    navigate('/');
  };

  const handleBack = () => {
    navigate('/'); // Navigate back to the contact list
  };

  return (
    <div className="add-contact-container">
      <h2>Add Contact</h2>
      <form onSubmit={handleSubmit} className="add-contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-buttons">
          <button type="button" className="back-btn" onClick={handleBack}>
            Back
          </button>
          <button type="submit" className="submit-btn">Add Contact</button>
        </div>
      </form>
    </div>
  );
};

export default AddContact;
