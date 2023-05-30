import mongoose, { Schema ,model} from "mongoose";

const PostSchema = new Schema({
    title: {type: String , required:true},
    summary: {type: String , required:true},
    content: {type: String , required:true},
    thumbnail: {type: String , required:true},
    category: {type: String , required:true},
    authorID:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
},{
    timestamps: true,
});

const Post = model("Post" , PostSchema);

export default Post;