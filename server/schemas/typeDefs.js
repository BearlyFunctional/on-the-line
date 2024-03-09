const typeDefs = ` 
    type User {
        _id: ID
        username: String
        email: String
        password: String
    }
    type Post {
        _id: ID
        caption: String
        altText: String
        image: String
        user: User
        comments: [Comment]
        createdAt: String
    }
    type Comment {
        _id: ID
        content: String
        # user: String
        user: User
    }

    type Auth {
        token: ID
        user: User
    }

    type PaginatedPost {
        docs: [Post]
        totalDocs: Int
        limit: Int
        page: Int
        totalPages: Int
        hasNextPage: Boolean
        nextPage: Int
        hasPrevPage: Boolean
        prevPage: Int
        pagingCounter: Int
    }

    type Query {
        # Working
        me: User

        # Working
        users(userId: String): [User]

        # Working
        posts(userId: String, page:Int): PaginatedPost

        # Future Development
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


        # All working aside from image uploading
        createPost(caption: String!, altText: String!, image: String): Post
        editPost(postId: String!, caption: String, altText: String, image: String): Post
        deletePost(postId: String!): Post

        # Working
        createComment(postId: String!, commentBody: String!): Comment
        editComment(postId: String!, commentId: String!, commentBody: String!): Comment
        deleteComment(postId: String!, commentId: String!): Comment
    }
`;

module.exports = typeDefs;