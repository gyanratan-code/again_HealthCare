// book appointment
const User = require('../models/User.js')
const Appointment= require('../models/appointment.js')
async function fetchUserPrescriptions(email) {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return "User Not Found";
      }
      const appointments = await Appointment.find({ user: user._id }, 'symptomsDescription').exec();
      const descriptions = appointments.map(appointment => appointment.symptomsDescription);
      return descriptions;
    } catch (error) {
      console.error('Error fetching user prescriptions:', error);
      return "Error fetching your responses";
    }
}
  
async function bookAppointment(userEmail, symptomsDescription) {
    try {
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return "user not found";
        // throw new Error('User not found');
        }
        const appointment = new Appointment({
        userEmail: userEmail,
        user: user._id,
        symptomsDescription: symptomsDescription,
        });
        const savedAppointment = await appointment.save();
        return savedAppointment;
    } catch (error) {
        console.error('Error booking appointment:', error);
        // throw error;
        return "Error in booking. Try later."
    }
}

module.exports = {fetchUserPrescriptions,bookAppointment}