import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import mongoDB from 'database/mongoDB';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password, ...restInfo } = req.body;
    const { client, db } = await mongoDB();

    const checkExisting = await db.collection('users').findOne({ email });

    if (checkExisting) {
      client.close();
      res.status(422).json({ result: false, error: '이미 가입된 계정이에요!' });
      return;
    }

    const hashPw = await hash(password, 12);
    const response = await db.collection('users').insertOne({
      email,
      password: hashPw,
      ...restInfo,
    });

    client.close();
    res.status(201).json({ result: true, message: 'User created', ...response });
  } else {
    res.status(500).json({ result: false, error: 'Route not valid' });
  }
}
