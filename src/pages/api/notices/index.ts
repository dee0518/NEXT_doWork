import { NextApiRequest, NextApiResponse } from 'next';
import mongoDB from 'database/mongoDB';

export default async function hanlder(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { page } = req.query;
    const { client, db } = await mongoDB();
    const noticesCollection = db.collection('notices');

    const response = await noticesCollection.find().sort({ created_at: -1 }).toArray();
    client.close();

    if (!response) {
      res.status(422).json({ result: false, error: '공지사항 조회에 실패했어요:(' });
      return;
    }

    res.status(422).json({ result: true, data: response });
  }
}
