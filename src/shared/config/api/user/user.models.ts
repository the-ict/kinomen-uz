import { CommentBodyModel } from '../comment/comment.model';
import { PostBodyModel } from '../posts/posts.model';

export interface UserBodyModels {
  id?: number;
  email: string;
  username: string;
  password: string;
  name?: string;
  about?: string;
  posts?: PostBodyModel[];
  comments?: CommentBodyModel[];
  followers: string[];
  followings: string[];
  liked: string[];
  watchlist: string[];
  coverImage?: string;
  imageUrl?: string;
}

export interface UpdateBodyModel {
  email?: string;
  username?: string;
  password?: string;
  name?: string;
  about?: string;
  posts?: PostBodyModel[];
  comments?: CommentBodyModel[];
  followers?: string[];
  followings?: string[];
  liked?: string[];
  watchlist?: string[];
  coverImage?: string;
  imageUrl?: string;
}
