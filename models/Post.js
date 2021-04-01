const { Schema, model }= require('mongoose');

const postSchema = new Schema({
    title: {
        type: String,
        trim: true,
        maxlength: 100
    },
    body: {
        type: String,
        requited: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    thumnails: String,
    readTime: String,
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    dislikes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }

    ]
}, {
    timestamps: true
})
module.exports = model('Post', postSchema);