import httpClient from '../httpClient';
import { COMMENTS, MY_COMMENTS } from '../URLs';
import { CommentBodyModel, CommentUpdateModel } from './comment.model';

const comment_requests = {
  createComment: async (body: CommentBodyModel) => {
    return (await httpClient.post(COMMENTS, body)).data;
  },
  getPostComments: async (postId: number) => {
    return (await httpClient.get(COMMENTS + 'post/' + postId)).data;
  },
  updateComment: async (id: number, body: CommentUpdateModel) => {
    return (await httpClient.put(COMMENTS + id, body)).data;
  },
  deleteComment: async (id: number) => {
    return (await httpClient.delete(COMMENTS + id)).data;
  },
  getReplies: async (commentId: number) => {
    return (await httpClient.get(COMMENTS + commentId + '/replies')).data;
  },
  geyMyComments: async () => {
    return (await httpClient.get(MY_COMMENTS)).data;
  },
  likeComment: async (commentId: number) => {
    return (await httpClient.post(`${COMMENTS}${commentId}/like`)).data;
  },
  dislikeComment: async (commentId: number) => {
    return (await httpClient.post(`${COMMENTS}${commentId}/dislike`)).data;
  },
};

export default comment_requests;
