const typeDefs = ` 
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
    }
    type Post {
        _id: ID
        caption: String
        altText: String!
        image: String!
        user: User!
        comments: [Comment]
    }
    type Comment {
        _id: ID
        commentText: String!
        user: User!
        post: Post!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users(username: String): [User]
        posts(username: String): [Post]
        comments(username: String): [Comment]
    }

    type Mutation {
        
        // User mutations
        login(email: String!, password: String!): Auth
        createUser(username: String!, email: String!, password: String!): Auth
        editUser(username: String, email: String, password: String): User
        deleteUser(_id: ID!): User

        // Post mutations
        createPost(caption: String, altText: String!, image: String!): Post
        editPost(_id: ID!, caption: String, altText: String, image: String): Post
        deletePost(_id: ID!): Post

        // Comment mutations
        createComment(postId: ID!, commentText: String!): Comment
        editComment(_id: ID!, commentText: String!): Comment
        deleteComment(_id: ID!): Comment
    }
`;

module.exports = typeDefs;