export interface PostBodyModel {
    title: string;
    content?: string;
    movie: string;
    rating: number;
    authorId: number;
    likes: string[];
    comments: string[];
    view: string[];
    imageUrl?: string;
}

export interface PostResponseModel {
    
}

