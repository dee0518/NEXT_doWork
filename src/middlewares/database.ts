import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) throw new Error('env error');
const uri: string = process.env.MONGODB_URI;

const mongoDB = async () => {
  const client = await MongoClient.connect(uri);
  const db = client.db();

  return { client, db };
};

export default mongoDB;
