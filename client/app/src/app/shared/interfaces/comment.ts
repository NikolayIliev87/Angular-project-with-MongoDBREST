import { IArticle } from "./article";
import { IUser } from "./user";

export interface IComment {
    _id: string;
    comment: string;
    owner: IUser;
    article: IArticle;
    like: boolean;
    __v: number;
    created_at: string
}