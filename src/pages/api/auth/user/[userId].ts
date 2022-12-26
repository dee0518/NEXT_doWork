import mongoDB from 'middlewares/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

export default async function hanlder(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET' && req.method !== 'PATCH' && req.method !== 'DELETE') {
    res.status(500).json({ result: false, error: 'Route not valid' });
    return;
  }

  const { client, db } = await mongoDB();
  const { userId } = req.query;

  if (req.method === 'GET') {
    const response = await db.collection('users').findOne({ _id: ObjectId(userId) });

    if (!response) {
      res.status(422).json({ result: false, error: '가입된 계정이 아니에요:(' });
      return;
    }

    const { _id, name, email, career, profile, introduce } = response;
    const id = _id.toString();

    res.status(201).json({ result: true, data: { id, name, email, career, profile, introduce } });
  } else if (req.method === 'PATCH') {
    const response = await db.collection('users').updateOne({ _id: ObjectId(userId) }, { $set: req.body });
    client.close();

    if (!response) {
      res.status(422).json({ result: false, error: '정보 업데이트를 실패했어요:(' });
      return;
    }

    res.status(201).json({ result: true, data: response });
  } else if (req.method === 'DELETE') {
    const response = await db.collection('users').deleteOne({ _id: ObjectId(userId) });
    client.close();

    if (!response) {
      res.status(422).json({ result: false, error: '계정 삭제를 실패했어요:(' });
      return;
    }

    res.status(201).json({ result: true, data: response });
  }
}
