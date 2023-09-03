import { Request, Response, NextFunction } from 'express';
import db from '../configs/dbconfig';

export const addNoteHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const inputData = req.body;

    const createData = {
      parent_id: inputData.parent_id || null,
      title: inputData.title,
      content: inputData.content,
    };

    const createValues = Object.values(createData);

    const createColumns = `
      parent_id,
      title,
      content
    `;

    const SQL = `
      INSERT INTO 
      note (${createColumns})
      VALUES (?, ?, ?)
    `;

    const [createdInfo, _] = await db.execute(SQL, createValues);

    const createdNoteId = (createdInfo as { insertId: number }).insertId;

    res.status(201).json({ message: '새로운 페이지 생성 성공', data: { note_id: createdNoteId } });
  } catch (error) {
    next(error);
  }
};

export const getNoteHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { note_id } = req.params;
  } catch (error) {
    next(error);
  }
};
