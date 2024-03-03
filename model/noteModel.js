import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: {}
    },
    user: {
        type: mongoose.ObjectId,
        ref: "User",
        required: true
    }
})

export default mongoose.model("Note", noteSchema);