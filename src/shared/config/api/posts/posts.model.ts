export interface PostBodyModel {
    title: string;
    content?: string;
    movie: string;
    rating: number;
    authorId?: number;
    likes?: string[];
    comments?: string[];
    view?: string[];
    imageUrl?: string;
}

export interface IAuthor  {
    id: number;
    name: string | null;
    email: string;
    imageUrl: string;
}

export interface IPost {
    author: IAuthor;
    authorId: number;
    content: string;
    createdAt: string;
    id: number;
    imageUrl: string;
    likes: string[];
    movie: string;
    rating: number;
    title: string;
    updatedAt: string;
    view: string[];
    published: boolean;
}


