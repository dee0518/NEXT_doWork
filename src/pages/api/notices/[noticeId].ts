import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import mongoDB from 'database/mongoDB';

export default async function hanlder(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { client, db } = await mongoDB();
    const noticesCollection = db.collection('notices');
    const { noticeId } = req.query;

    const response = await noticesCollection.findOne({ _id: ObjectId(noticeId) });
    client.close();

    if (!response) {
      res.status(422).json({ result: false, error: '공지사항 조회에 실패했어요:(' });
      return;
    }

    res.status(200).json({ result: true, data: response });
  }
}
