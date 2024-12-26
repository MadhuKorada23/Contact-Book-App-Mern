import axios from 'axios';

const API_URL = 'https://contact-book-backend-o5ld.onrender.com';

export const getContacts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching contacts', error);
  }
};

export const addContact = async (contact) => {
  try {
    const response = await axios.post(API_URL, contact);
    return response.data;
  } catch (error) {
    console.error('Error adding contact', error);
  }
};

export const updateContact = async (id, contact) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, contact);
    return response.data;
  } catch (error) {
    console.error('Error updating contact', error);
  }
};

export const deleteContact = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting contact', error);
  }
};
