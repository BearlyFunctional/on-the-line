const { Schema, model } = require('mongoose');
const userSchema = require('./User');

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: false,
        },
        image: {
            name: String,
            required: true,
            data: Buffer
        },
        user: userSchema,
        comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

postSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

const Post = model('post', postSchema);

module.exports = Post;