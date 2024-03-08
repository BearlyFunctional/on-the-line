const { Schema, model } = require('mongoose');

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
            type: {
                name: String,
                data: Buffer
            }
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