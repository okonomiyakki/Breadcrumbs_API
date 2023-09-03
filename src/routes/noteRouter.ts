import { Router } from 'express';
import * as noteServive from '../services/noteService';

const noteRouter = Router();

noteRouter.post('/', noteServive.addNoteHandler);

noteRouter.get('/:noteId', noteServive.getNoteHandler);

export default noteRouter;
