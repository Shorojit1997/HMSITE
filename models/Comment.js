const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        required: true,
    },
    replies: [
        {
            body: {
                type: String,
                required: true
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            createdAt: {
                type: String,
                default: new Date()
            }
        }
    ]
}, {
    timestamps: true
})
module.exports = model('Comment', commentSchema);