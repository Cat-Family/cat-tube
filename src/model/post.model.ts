import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "./user.model";

export class Post {
  @prop({ ref: () => User })
  user: Ref<User>;

  @prop({ required: true })
  postName: string;

  @prop({ required: true })
  postUrl: string;

  @prop({ required: true })
  posterUrl: string;

  @prop({ required: true })
  description: string;

  @prop({ default: false })
  isActive: boolean;
}

const PostModel = getModelForClass(Post, {
  schemaOptions: {
    timestamps: true,
  },
});

export default PostModel;
