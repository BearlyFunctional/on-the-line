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
        users(userId: String): [User]
        posts(userId: String): [Post]
        comments(userId: String): [Comment]
    }

    type Mutation {
        
        login(email: String!, password: String!): Auth
        createUser(username: String!, email: String!, password: String!): Auth
        editUser(username: String, email: String, password: String): User
        deleteUser(_id: ID!): User

        createPost(caption: String!, altText: String!, image: String): Post
        editPost(_id: ID!, caption: String, altText: String, image: String): Post
        deletePost(_id: ID!): Post

        createComment(postId: ID!, commentBody: String!): Comment
        editComment(_id: ID!, commentBody: String!): Comment
        deleteComment(_id: ID!): Comment
    }
`;

module.exports = typeDefs;