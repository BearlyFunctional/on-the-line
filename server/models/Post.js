const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const paginate = require('mongoose-paginate-v2');
const dateFormat = require('../utils/dateFormat');

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
        image:  {
            type: String
        },
        user: { 
            type: Schema.Types.ObjectId, ref :'user' 
        },
        comments: [commentSchema],
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

postSchema.plugin(paginate);

postSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

const Post = model('post', postSchema);

module.exports = Post;