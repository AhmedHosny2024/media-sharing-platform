export type User={
    name:string;
    email:string;
    password:string;
    id:number;
}
export type PostHeader={
    userName:string;
    createdAt:string;
}

export type PostType={
    url:string;
    type:string;
}
export type Post = {
    id: number;
    userName: string;
    data: PostType[];
    createdAt: string;
    likedBy: User[];
};