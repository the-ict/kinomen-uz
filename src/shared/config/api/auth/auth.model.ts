import type { CommentBodyModel } from '../comment/comment.model';
import type { PostBodyModel } from '../posts/posts.model';
import { UserBodyModels } from '../user/user.models';

export interface LoginBodyModel {
  email: string;
  password: string;
}

export interface RegisterBodyModel {
  email: string;
  username: string;
  password: string;
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

export interface RegisterResponseModel {
  message: string;
  user: UserBodyModels;
  token: string;
}

export interface LoginResponseModel {
  message: string;
  user: UserBodyModels;
  token: string;
}
