# On-the-line

![License](https://img.shields.io/badge/License-MIT_License-lightblue.svg)

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Future Devs](#future-devs)
- [License](#license)
- [Credit](#credit)

## Description

We have developed a social media application featuring user authentication capabilities. Our platform allows users to seamlessly post images accompanied by captions, fostering engagement through interactive commenting functionality. 

Powered by a MERN stack architecture, our single-page application leverages React for an intuitive front-end experience, further enhanced by the elegance of Tailwind CSS/components/UI for design consistency and flexibility, while harnessing the power of GraphQL with Node.js and Express.js for efficient server-side operations. Data persistence is ensured through the utilization of MongoDB and Mongoose ODM, while AWS S3 serves as our reliable cloud server solution, ensuring seamless scalability and data management.

Seperation of tasks:

Ivana:
- all front-end aspects
- inital mongoose/grapql setup with login/sign up abilties
- initially implemeted multer to store images 
- then set up the cloud server (to store images) & connected it to front end 


Henry:
- mostly backend
- expanded on models to include Post and Comments
- expanded on resolvers and typeDefs to include Post and Comments functionality
- expanded on mutations and queries (on the front-end) to include the Posts and Comments functionality 

screenshots:

welcome page: 

![welcome-page](https://github.com/Ivana-Djordjevic/on-the-line/assets/127266659/3cc95acc-923c-4689-8858-4c893be690d3)

signup page:

![signup-form](https://github.com/Ivana-Djordjevic/on-the-line/assets/127266659/9fa325f3-f908-497b-8f97-3af5e4442e56)

homepage:

![homepage-once-logged-in](https://github.com/Ivana-Djordjevic/on-the-line/assets/127266659/83d6d2d5-f892-40df-971c-eba16e9c0fa5)

create post form:

![create-post-form](https://github.com/Ivana-Djordjevic/on-the-line/assets/127266659/0200165f-ae1f-4b9e-b0b1-c6114482f72a)

[deployed Render link](https://on-the-line.onrender.com/)

## Installation

Front end:
- @apollo/client
- jwt-decode
- react
- react-dom
- react-paginate
- react-router-dom
- vite
- @vitejs/plugin-react

Backend :
- @apollo/server
- @aws-sdk/client-s3
- bcrypt
- dotenv
- express
- graphql
- heic-convert
- jsonwebtoken
- mongoose
- mongoose-paginate-v2
- multer

## Usage

In this application, users have the ability to navigate through a collection of posts authored by their peers, affording them the opportunity to engage in discourse through the addition of comments. Additionally, users possess the autonomy to modify and remove their own contributions within the platform, ensuring a personalized and curated experience tailored to individual preferences.

## Future devs:

Bugs:
- fix pagination:
currently the previous button only works if you press the next button twice, for that reason it was commented out 

Improvments:
- add a profile page where users can edit or delete their profile
- add a donate page where users can donate to devs
- add a feature that enables user to add filters onto their images
- add a feature that enables users to like, as well as share a post
- add a dark mode

## License

This application is covered under: MIT License. 

## Credit

- [video that help me switch to AWS S3 cloud server](https://www.youtube.com/watch?v=eQAIojcArRY&ab_channel=SamMeech-Ward)
- [Tailwind post component used](https://tailwindcomponents.com/component/instagram-post)
- [Tailwind dropdown menu component used](https://tailwindcomponents.com/component/dropdown-theme-with-tailwind-css)
- [Tailwind UI textarea design used](https://tailwindui.com/components/application-ui/forms/textareas)
- [.HEIC image conversion](https://codesandbox.io/p/sandbox/heic-convert-geyy0)
