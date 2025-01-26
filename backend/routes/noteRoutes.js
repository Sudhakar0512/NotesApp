// routes/noteRoutes.js
import express from 'express';
import noteController from '../controllers/noteController.js';

const router = express.Router();


router.get('/tags', noteController.getAllTags.bind(noteController));
router.get('/', noteController.getAllNotes.bind(noteController));
router.post('/', noteController.createNote.bind(noteController));
router.get('/:id', noteController.getNoteById.bind(noteController));
router.put('/:id', noteController.updateNote.bind(noteController));
router.delete('/:id', noteController.deleteNote.bind(noteController));

export default router;