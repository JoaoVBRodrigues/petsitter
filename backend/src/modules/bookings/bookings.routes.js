const express = require('express');
const bookingsController = require('./bookings.controller');
const authMiddleware = require('../../middlewares/authMiddleware');
const roleMiddleware = require('../../middlewares/roleMiddleware');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['OWNER']), bookingsController.createBooking);
router.get('/received', authMiddleware, roleMiddleware(['SITTER']), bookingsController.getReceivedBookings);
router.patch('/:id/status', authMiddleware, roleMiddleware(['SITTER']), bookingsController.updateBookingStatus);
router.get('/sent', authMiddleware, roleMiddleware(['OWNER']), bookingsController.getSentBookings);

module.exports = router;
