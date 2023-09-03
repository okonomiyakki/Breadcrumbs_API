import { Router } from 'express';
import * as noteServive from '../services/noteService';

const noteRouter = Router();

noteRouter.post('/', noteServive.addNoteHandler);

noteRouter.get('/:pageId', noteServive.getNoteHandler);

export default noteRouter;
