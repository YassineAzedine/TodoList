import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  toObject(): { [x: string]: any; password: any; } {
      throw new Error('Method not implemented.');
  }


  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
