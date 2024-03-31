export type PostType = {
    type: "image" | "video";
    src: string;
};
export type Post = {
    id: number;
    userName: string;
    data: PostType[];
    createdAt: string;
    like: boolean;
};
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
