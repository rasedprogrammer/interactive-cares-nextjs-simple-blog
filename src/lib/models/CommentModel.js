import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema({
  userId: String,
  name: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const CommentSchema = new mongoose.Schema(
  {
    blogId: String,
    userId: String,
    name: String,
    content: String,
    createdAt: { type: Date, default: Date.now },
    replies: [ReplySchema], // Nested replies
  },
  { timestamps: true }
);

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
