import { gql } from '@apollo/client';

// User mutations
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const EDIT_USER = gql`
    mutation editUser($userId: ID!, $username: String, $email: String, $password: String) {
        editUser(userId: $userId, username: $username, email: $email, password: $password) {
            _id
            username
            email
        }
    }
`;

export const DELETE_USER = gql`
    mutation deleteUser($_id: ID!) {
        deleteUser(_id: $_id) {
            _id
        }
    }
`;

// Post mutations
export const CREATE_POST = gql`
    mutation createPost($caption: String!, $altText: String!, $image: String) {
        createPost(caption: $caption, altText: $altText, image: $image) {
            _id
            caption
            altText
            image
            user
        }
    }
`;

export const EDIT_POST = gql`
    mutation editPost($postId: ID!, $caption: String, $altText: String, $image: String) {
        editPost(postId: $postId, caption: $caption, altText: $altText, image: $image) {
            _id
            caption
            altText
            image
            user
        }
    }
`;

export const DELETE_POST = gql`
    mutation deletePost($_id: ID!) {
        deletePost(_id: $_id) {
            _id
        }
    }
`;

// Comment mutations
export const CREATE_COMMENT = gql`
    mutation createComment($postId: ID!, $commentBody: String!) {
        createComment(postId: $postId, commentBody: $commentBody) {
            _id
            content
            user
        }
    }
`;

export const EDIT_COMMENT = gql`
    mutation editComment($postId: String!, $commentId: String!, $commentBody: String!) {
        editComment(postId: $postId, commentId: $commentId, commentBody: $commentBody) {
            _id
            content
            user
        }
    }
`;

export const DELETE_COMMENT = gql`
    mutation deleteComment($postId: String!, $commentId: String!) {
        deleteComment(postId: $postId, commentId: $commentId) {
            _id
        }
    }
`;