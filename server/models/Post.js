const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');

const postSchema = new Schema(
    {
        caption: {
            type: String,
            required: true,
        },
        altText: {
            type: String,
            required: true,
        },
        image:  {
            type: String
        },
        // user: {
        //     type: Schema.Types.ObjectId, ref :'user'
        // },
        user: { type: Schema.Types.ObjectId, ref :'user' },
        comments: [commentSchema],
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