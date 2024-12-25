 


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getContacts, updateContact } from '../api';
import './EditContact.css';

const EditContact = () => {
  const { id } = useParams(); // Get the contact ID from the URL
  const navigate = useNavigate();

  // States to hold contact details
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Fetch the contact data when the component mounts
  useEffect(() => {
    const fetchContact = async () => {
      const contactData = await getContacts();
      const contact = contactData.find((contact) => contact._id === id);
      if (contact) {
        setName(contact.name);
        setEmail(contact.email);
        setPhone(contact.phone);
      }
    };
    fetchContact();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedContact = { name, email, phone };
    await updateContact(id, updatedContact); // Call the API to update the contact
    navigate('/'); // Redirect to home page after updating
  };

  const handleBack = () => {
    navigate('/'); // Navigate back to the contact list page
  };

  return (
    <div className="edit-contact-container">
      <h2 className="edit-contact-title">Edit Contact</h2>
      <form onSubmit={handleSubmit} className="edit-contact-form">
        <input
          type="text"
          className="edit-contact-input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          className="edit-contact-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          className="edit-contact-input"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <div className="form-buttons">
          <button
            type="button"
            className="back-button"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            type="submit"
            className="edit-contact-button"
          >
            Update Contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContact;
