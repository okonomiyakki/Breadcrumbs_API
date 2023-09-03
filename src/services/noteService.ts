import { Request, Response, NextFunction } from 'express';
import db from '../configs/dbconfig';

/** 페이지 등록 */
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

    res.status(201).json({ message: '페이지 생성 성공', data: { note_id: createdNoteId } });
  } catch (error) {
    next(error);
  }
};

/** 페이지 조회 */
export const getNoteHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const note_id = req.params.pageId;

    const SQL1 = `
      SELECT note_id, title, content, parent_id
      FROM note 
      WHERE note_id = ?
    `;

    const SQL2 = `
      SELECT note_id, title 
      FROM note 
      WHERE parent_id = ?
    `;

    const [findPage]: any = await db.execute(SQL1, [note_id]);

    const page = {
      note_id: findPage[0].note_id,
      title: findPage[0].title,
      content: findPage[0].content,
    };

    const [findSubPages]: any = await db.execute(SQL2, [note_id]);

    const subPages = findSubPages.map((page: { title: string }) => page.title);

    const breadcrumbs = [];
    let current_parent_id: any = note_id;

    while (current_parent_id !== null) {
      let [row]: any[] = await db.execute(SQL1, [current_parent_id]);

      let { parent_id, title } = row[0];

      if (parent_id === null) {
        breadcrumbs.unshift(title);
        break;
      }

      breadcrumbs.unshift(title);
      current_parent_id = parent_id !== null ? parent_id : null;
    }

    const pageInfo = {
      ...page,
      subPages,
      breadcrumbs,
    };

    res.status(200).json({ message: '페이지 정보 조회 성공', data: pageInfo });
  } catch (error) {
    next(error);
  }
};
