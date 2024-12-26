import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContactList.css';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState(null); // To store the selected contact details
  const navigate = useNavigate();

  // Fetch and sort contacts alphabetically on initial load
  useEffect(() => {
    fetch('http://localhost:5000/contacts')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched contacts:', data);

        // Sort contacts alphabetically by name
        const sortedContacts = data.sort((a, b) => a.name.localeCompare(b.name));
        setContacts(sortedContacts);
        setFilteredContacts(sortedContacts);
      })
      .catch((error) => console.error('Error fetching contacts:', error));
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredContacts(
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(query)
      )
    );
  };

  const handleAddContact = () => {
    navigate('/add-contact');
  };

  const handleEditContact = (contactId) => {
    navigate(`/edit-contact/${contactId}`);
  };

  const handleDeleteContact = (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      fetch(`http://localhost:5000/contacts/${contactId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            const updatedContacts = contacts.filter(
              (contact) => contact._id !== contactId
            );

            // Update and re-sort the contact list after deletion
            const sortedContacts = updatedContacts.sort((a, b) =>
              a.name.localeCompare(b.name)
            );
            setContacts(sortedContacts);
            setFilteredContacts(sortedContacts);
            setSelectedContact(null);
          } else {
            console.error('Error deleting contact:', response.statusText);
          }
        })
        .catch((error) => console.error('Error deleting contact:', error));
    }
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const closeModal = () => {
    setSelectedContact(null);
  };

  return (
    <div className="contact-list-page">
      <nav className="navbar">
        <h1 className="navbar-title">Contact List</h1>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar"
          placeholder="Search contacts..."
        />
        <button onClick={handleAddContact} className="add-contact-nav-button">
          +Add Contact
        </button>
      </nav>
      <div className="contact-list-container">
        {filteredContacts.length === 0 ? (
          <p className="no-contacts">No contacts found.</p>
        ) : (
          <div className="contact-cards">
            {filteredContacts.map((contact) => (
              <div
                key={contact._id}
                className="contact-card"
                onClick={() => handleContactClick(contact)}
              >
                <h3 className="contact-card-name">{contact.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedContact && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedContact.name}</h2>
            <p><strong>Email:</strong> {selectedContact.email}</p>
            <p><strong>Phone:</strong> {selectedContact.phone}</p>
            <div className="modal-actions">
              <button
                onClick={() => handleEditContact(selectedContact._id)}
                className="edit-contact-button"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteContact(selectedContact._id)}
                className="delete-contact-button"
              >
                Delete
              </button>
            </div>
            <button className="close-modal-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;

 
 
