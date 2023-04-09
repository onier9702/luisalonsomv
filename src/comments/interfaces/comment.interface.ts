
export interface Data {
    comments: Comment[];
}

export interface Comment {
    text: string;
    author?: string;
}