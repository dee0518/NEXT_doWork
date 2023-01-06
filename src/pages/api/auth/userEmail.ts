import { NextApiRequest, NextApiResponse } from 'next';
import mongoDB from 'database/mongoDB';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { client, db } = await mongoDB();

    const response = await db.collection('users').findOne({ email: req.body.email });
    client.close();

    if (!response) {
      res.status(422).json({ result: false, error: '회원을 찾을 수 없어요:(' });
      return;
    }
    const { _id, name, email, career, profile, introduce } = response;
    const id = _id.toString();
    const data = { id, name, email, career, profile, introduce };

    res.status(201).json({ result: true, data });
  }
}
