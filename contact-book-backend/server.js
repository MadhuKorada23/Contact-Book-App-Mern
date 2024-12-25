// // server.js

// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// // Load environment variables from .env file
// dotenv.config();
 


// const app = express();
// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.log('Error connecting to MongoDB:', err));

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const contactRoutes = require('./routes/contactRoutes');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Use routes
const cors = require('cors');
app.use(cors());

app.use('/contacts', contactRoutes);
app.get('/contacts', async (req, res) => {
    try {
      const contacts = await Contact.find(); // Ensure 'Contact' is the correct model
      res.json(contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).send('Error fetching contacts');
    }
  });

//  try {
//      const contacts = await Contact.find();
//      res.status(200).json(contacts);
//    } catch (error) {
//      res.status(400).json({ message: 'Error fetching contacts', error });
//    }

  

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
