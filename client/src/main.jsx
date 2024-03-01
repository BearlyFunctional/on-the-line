import React from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx'
import Home from './pages/HomePage.jsx';
import Signup from './pages/SignupPage.jsx';
import Login from './pages/LoginPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import SignInHeader from './components/SignInHeader.jsx';
import CreatePost from './pages/CreatePostPage.jsx';
import MyPosts from './pages/MyPostsPage.jsx';
import Donate from './pages/DonatePage.jsx';

import './index.css'

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Home />
			}, {
				path: '/login',
				element: <SignInHeader> <Login /> </SignInHeader>
			}, {
				path: '/signup',
				element: <SignInHeader> <Signup /> </SignInHeader>
			}, {
				path: '/createPost',
				element: <CreatePost/>
			}, {
				path: '/myPosts',
				element: <MyPosts/>
			}, {
				path: '/donate',
				element: <Donate/>
			}
		]
	}
]);

ReactDOM
	.createRoot(document.getElementById('root'))
	.render(
		<RouterProvider router={router} />
	)
