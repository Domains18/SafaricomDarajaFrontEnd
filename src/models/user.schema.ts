import { Document, Schema as MongooseSchema, Types} from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser } from 'src/types/interfaces/user';
import { AuthProvider } from 'src/types/enums/authProvider';


@Schema({ collection: "users" })
export class User extends Document implements IUser{
    @Prop({
        type: MongooseSchema.Types.ObjectId,
        isRequired: true,
        default: Types.ObjectId
    })
    _id: string;
    
    @Prop({
        type: String,
        isRequired: true
    })
    username: string;

    @Prop({
        type: String,
        isRequired: false
    })
    password?: string;

    @Prop({
        type: String,
        isRequired: true,
    })
    authProvider: AuthProvider;

    @Prop({
        type: Date,
        default: Date.now
    })
    createdAt?: Date;
}
export const UserSchema = SchemaFactory.createForClass(User)
