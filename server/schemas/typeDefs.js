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
        user: String!
        comments: [Comment]
    }
    type Comment {
        _id: ID
        commentText: String!
        user: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        # Working
        me: User

        # Single user not working
        users(userId: String): [User]

        # Working
        posts(userId: String): [Post]

        # Unable to test
        comments(userId: String): [Comment]
    }

    type Mutation {
        
        # Working
        login(email: String!, password: String!): Auth

        # Working
        createUser(username: String!, email: String!, password: String!): Auth

        # Future development
        editUser(username: String, email: String, password: String): User
        deleteUser(_id: ID!): User

        # Imgs non functional
        createPost(caption: String!, altText: String!, image: String): Post

        # Not working
        editPost(_id: ID!, caption: String, altText: String, image: String): Post

        # Working
        deletePost(_id: ID!): Post

        # Not Working (Destructuring error)
        createComment(postId: ID!, commentBody: String!): Comment
        editComment(_id: ID!, commentBody: String!): Comment
        deleteComment(_id: ID!): Comment
    }
`;

module.exports = typeDefs;