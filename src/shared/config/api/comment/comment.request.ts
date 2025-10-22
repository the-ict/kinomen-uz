import httpClient from "../httpClient";
import { COMMENTS } from "../URLs";
import { CommentBodyModel, CommentUpdateModel } from "./comment.model";

const comment_requests = {
    createComment: async( body: CommentBodyModel)=> {
        return (await httpClient.post(COMMENTS, body)).data;
    },
    getPostComments: async(postId: number) =>{
        return (await httpClient.get(COMMENTS + "/post/" + postId)).data;
    } ,
    updateComment: async(id: number, body: CommentUpdateModel) => {
        return (await httpClient.put(COMMENTS + id, body)).data;
    },
    deleteComment: async(id: number) => {
        return (await httpClient.delete(COMMENTS + id)).data;
    },
    getReplies: async(commentId: number) => {
        return (await httpClient.get(COMMENTS + commentId + "/replies")).data;
    }
}

export default comment_requests