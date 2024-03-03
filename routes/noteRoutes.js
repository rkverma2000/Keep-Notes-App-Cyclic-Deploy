import express from 'express'
import requiredSignIn from '../middlewares/authMiddlewares.js'
import { createNoteController, deleteNoteController, getNotesController } from '../controllers/noteControllers.js';


const router = express.Router();

router.post('/create-note', requiredSignIn, createNoteController);

router.delete('/delete-note/:nId', requiredSignIn, deleteNoteController);

router.get('/get-notes', requiredSignIn, getNotesController)

export default router