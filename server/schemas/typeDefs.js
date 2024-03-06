const typeDefs = ` 
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        
        login(email: String!, password: String!): Auth
        createUser(username: String!, email: String!, password: String!): Auth
        editUser(username: String, email: String, password: String): User
        deleteUser(_id: ID!): User

        createPost(caption: String, altText: String!, image: String!): Post
        editPost(_id: ID!, caption: String, altText: String, image: String): Post
        deletePost(_id: ID!): Post

        createComment(postId: ID!, commentText: String!): Comment
        editComment(_id: ID!, commentText: String!): Comment
        deleteComment(_id: ID!): Comment
    }
`;

module.exports = typeDefs;