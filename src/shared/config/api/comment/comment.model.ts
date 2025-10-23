import { IAuthor, IPost } from '../posts/posts.model';
import { UserBodyModels } from '../user/user.models';

export interface CommentBodyModel {
  postId: number;
  content: string;
  authorId: number;
  parentId?: number;
  parent?: CommentBodyModel;
  replies?: CommentBodyModel[];
}

export interface CommentUpdateModel {
  postId?: number;
  content?: string;
  authorId?: number;
  parentId?: number;
  parent?: CommentBodyModel;
  replies?: CommentBodyModel[];
}

export interface IComment {
  id: number;
  postId: number;
  content: string;
  authorId: number;
  parentId?: number;
  parent?: CommentBodyModel;
  replies?: CommentBodyModel[];
  author: UserBodyModels;
  post: IPost;
  createdAt: Date;
  likes: string[];
  dislikes: string[];
}

export interface CreateCommentResponseModal {
  mesage: string;
  comment: IComment;
}
