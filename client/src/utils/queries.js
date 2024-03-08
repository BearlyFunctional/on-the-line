import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query me {
        me {
            _id
            username
            email
            password
        }
    }
`;

export const QUERY_USERS = gql`
    query users($userId: String, $limit: Int, $offset: Int) {
        users(userId: $userId, limit: $limit, offset: $offset) {
            _id
            username
        }
    }
`;

export const QUERY_POSTS = gql`
    query posts($userId: String) {
        posts(userId: $userId) {
            _id
            caption
            altText
            image
            comments {
                _id
                commentText
            }
            user {
                _id
                username
            }
        }
    }
`;

export const QUERY_COMMENTS = gql`
    query comments($userId: String, $limit: Int, $offset: Int) {
        comments(userId: $userId, limit: $limit, offset: $offset) {
            _id
            content
        }
    }
`;