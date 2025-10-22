export interface CommentBodyModel {
    postId: number;
    content: string;
    authorId: number;
    parentId?: number;
    parent?: CommentBodyModel;
    replies?: CommentBodyModel[];
}