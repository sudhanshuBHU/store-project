import { Schema, Document, models, model } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
}

const PostSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

export default models.Post || model<IPost>('Post', PostSchema); 