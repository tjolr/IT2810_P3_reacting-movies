import { Schema, model, Document, Model, Types } from 'mongoose';

// SCHEMA

const reviewSchema = new Schema({
  movie_id: Types.ObjectId,
  text: String,
  author: String,
});

// INTERFACE

export interface Review extends Document {
  movie_id: string;
  text: string;
  author: string;
}

// MODEL

export const ReviewModel: Model<Review> = model<Review>('Review', reviewSchema);
