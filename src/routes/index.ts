import express from 'express';
import noteRouter from './noteRouter';

const router = express.Router();

router.use('/v1/notes', noteRouter);

export default router;
