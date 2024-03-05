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
    query users($username: String) {
        users(username: $username) {
            _id
            username
        }
    }
`;

export const QUERY_POSTS = gql`
    query posts($username: String) {
        posts(username: $username) {
            _id
            caption
            altText
            image
            user {
                _id
                username
            }
            comments {
                _id
                commentText
                user {
                    _id
                    username
                }
            }
        }
    }
`;

export const QUERY_COMMENTS = gql`
    query comments($username: String) {
        comments(username: $username) {
            _id
            commentText
            user {
                _id
                username
            }
            post {
                _id
                caption
            }
        }
    }
`;