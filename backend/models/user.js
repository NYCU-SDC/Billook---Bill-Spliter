import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdBooks: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Book'
    }
});

export default mongoose.model("User", UserSchema);
// the third parameters is the collection name in the database
// otherwise it will be the plural lowcase of the model name