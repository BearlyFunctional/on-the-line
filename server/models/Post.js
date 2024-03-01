const { Schema, model } = require('mongoose');

const postSchema = new Schema(
    {
        caption: {
            type: String,
            required: false,
        },
        altText: {
            type: String,
            required: true,
        },
        image: {
            name: String,
            required: true,
            data: Buffer
        },
        user: {
            type: Schema.Types.ObjectId, ref :'user'
        },
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