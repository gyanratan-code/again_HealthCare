const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    userEmail: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    symptomsDescription: {
      type: String,
      required: true
    },
    bookedSlotDate: {
      type: Date,
      default: Date.now()
    }
  });
  
module.exports = mongoose.model('Appointment', appointmentSchema);
