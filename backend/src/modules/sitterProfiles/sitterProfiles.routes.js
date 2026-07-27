const express = require('express');
const sitterProfilesController = require('./sitterProfiles.controller');
const authMiddleware = require('../../middlewares/authMiddleware');
const roleMiddleware = require('../../middlewares/roleMiddleware');

const router = express.Router();

router.get('/', sitterProfilesController.listProfiles);
router.get('/me', authMiddleware, roleMiddleware(['SITTER']), sitterProfilesController.getMyProfile);
router.put('/me', authMiddleware, roleMiddleware(['SITTER']), sitterProfilesController.upsertProfile);
router.get('/:id', sitterProfilesController.getProfileById);

module.exports = router;
