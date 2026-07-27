const prisma = require('../../config/prisma');

const createBooking = async (req, res, next) => {
  try {
    const ownerId = req.user.id;
    const { sitterId, requestedDate } = req.body;

    const sitterUser = await prisma.user.findFirst({
      where: { id: sitterId, role: 'SITTER' }
    });

    if (!sitterUser) {
      return res.status(400).json({ message: 'Sitter inválido' });
    }

    const booking = await prisma.booking.create({
      data: {
        ownerId,
        sitterId,
        requestedDate: new Date(requestedDate),
        status: 'PENDING'
      }
    });

    return res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

const getReceivedBookings = async (req, res, next) => {
  try {
    const sitterId = req.user.id;
    const bookings = await prisma.booking.findMany({
      where: { sitterId },
      include: {
        owner: { select: { name: true, email: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    return res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

const updateBookingStatus = async (req, res, next) => {
  try {
    const sitterId = req.user.id;
    const { id } = req.params;
    const { status } = req.body;

    if (!['ACCEPTED', 'DECLINED'].includes(status)) {
      return res.status(400).json({ message: 'Status inválido' });
    }

    const booking = await prisma.booking.findUnique({ where: { id } });

    if (!booking) {
      return res.status(404).json({ message: 'Solicitação não encontrada' });
    }

    if (booking.sitterId !== sitterId) {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    if (booking.status !== 'PENDING') {
      return res.status(400).json({ message: 'Solicitação já respondida' });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { status }
    });

    return res.status(200).json(updatedBooking);
  } catch (error) {
    next(error);
  }
};

const getSentBookings = async (req, res, next) => {
  try {
    const ownerId = req.user.id;
    const bookings = await prisma.booking.findMany({
      where: { ownerId },
      include: {
        sitter: { select: { name: true, sitterProfile: { select: { pricePerHour: true } } } }
      },
      orderBy: { createdAt: 'desc' }
    });
    return res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getReceivedBookings,
  updateBookingStatus,
  getSentBookings
};
