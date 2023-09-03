import express from 'express';
import db from './configs/dbconfig';
import env from './configs/envconfig';
import router from './routes';

const app = express();
const port = Number(env.PORT || 3000);

app.use(express.json()); // json 파싱

app.use('/api', router);

db.getConnection()
  .then(async () => {
    console.log('✅ MySQL 접속 성공');

    app.listen(port, () => {
      console.log('DB_HOST:', env.DB_HOST);
      console.log('DB_NAME:', env.DB_NAME);
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.log('⛔ MySQL 접속 및 서버 실행 실패', error));
