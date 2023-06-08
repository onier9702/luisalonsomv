
export interface Data {
    comments: CommentObj[];
}

export interface CommentObj {
    text: string;
    author?: string;
}