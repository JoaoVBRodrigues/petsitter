const prisma = require('../../config/prisma');

const upsertProfile = async (req, res, next) => {
  try {
    const { bio, pricePerHour, availability, petTypes } = req.body;
    const userId = req.user.id;

    const profile = await prisma.sitterProfile.upsert({
      where: { userId },
      update: {
        bio,
        pricePerHour,
        availability,
        petTypes,
      },
      create: {
        userId,
        bio,
        pricePerHour,
        availability,
        petTypes,
      },
    });

    return res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

const getProfileById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const profile = await prisma.sitterProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    });

    if (!profile) {
      return res.status(404).json({ message: 'Perfil não encontrado' });
    }

    return res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

const getMyProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const profile = await prisma.sitterProfile.findUnique({
      where: { userId }
    });
    if (!profile) return res.status(404).json({ message: 'Perfil não encontrado' });
    return res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

const listProfiles = async (req, res, next) => {
  try {
    const { petType } = req.query;
    const where = {};
    if (petType) {
      where.petTypes = {
        contains: petType,
        mode: 'insensitive',
      };
    }
    const profiles = await prisma.sitterProfile.findMany({
      where,
      include: {
        user: {
          select: { name: true }
        }
      }
    });
    return res.status(200).json(profiles);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  upsertProfile,
  getProfileById,
  getMyProfile,
  listProfiles
};
