const express = require('express');
const router = express.Router();
const Location = require('../models/Location');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// Get all locations
router.get('/all', verifyToken, isAdmin, async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});

// Create a new location
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const newLocation = new Location(req.body);
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create location' });
  }
});

// Update a location
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const updatedLocation = await Location.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedLocation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update location' });
  }
});

// Delete a location
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await Location.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete location' });
  }
});

module.exports = router;