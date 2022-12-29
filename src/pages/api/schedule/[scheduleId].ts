import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import mongoDB from 'middlewares/database';

export default async function hanlder(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { client, db } = await mongoDB();
    const scheduleCollection = db.collection('schedule');
    const { scheduleId } = req.query;

    const response = await scheduleCollection.findOne({ _id: ObjectId(scheduleId) });
    client.close();

    if (!response) {
      res.status(422).json({ result: false, error: '일정 조회에 실패했어요:(' });
      return;
    }

    res.status(200).json({ result: true, data: response });
  } else if (req.method === 'DELETE') {
    const { client, db } = await mongoDB();
    const scheduleCollection = db.collection('schedule');

    const { scheduleId } = req.query;
    const response = await scheduleCollection.deleteOne({ _id: ObjectId(scheduleId) });
    client.close();

    if (!response) {
      res.status(422).json({ result: false, error: '일정 삭제에 실패했어요:(' });
      return;
    }

    res.status(200).json({ result: true, data: response });
  }
}
