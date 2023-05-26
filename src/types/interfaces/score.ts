import { Types } from 'mongoose';


export interface IScore {
    readonly _id: string;
    readonly score: number;
    readonly user: Types.ObjectId
}
