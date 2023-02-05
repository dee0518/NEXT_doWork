import { ObjectId } from 'mongodb';
import { ObjectId } from 'mongodb';
import { ObjectId } from 'mongodb';

export interface iNotice {
  _id: string;
  title: string;
  content: string;
  created_at: number;
}

export interface iNoticePromise {
  _id: ObjectId;
  title: string;
  content: string;
  created_at: number;
}
