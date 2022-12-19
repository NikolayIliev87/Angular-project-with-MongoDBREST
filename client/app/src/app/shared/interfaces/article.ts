import { IUser } from "./user";

export interface IArticle {
    category: string,
    description: string,
    owner: IUser,
    status: string,
    title: string,
    __v:string,
    _id: string,
    followers: [],
    // comments: [],
    created_at: string,
    updated_at: string
}