const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const fs = require('fs');

const multer = require('multer');
const sharp = require('sharp');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    imageOptions: {
		fileFormat: 'jpg',
		useTimestamp: true
	},
	// filename: function (req, file, cb) {
    //     // Rename the file with a .jpg extension
    //     cb(null, `${file.fieldname}-${Date.now()}.jpg`);
    // }
})

const upload = multer({ storage: storage })

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

const app = express();
const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const startApolloServer = async () => {
	await server.start();

	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());

	app.use('/graphql', expressMiddleware(server, {
		context: authMiddleware
		}
	));

	app.use('/uploads', express.static('uploads'));
	
	const uploadAuth = (req, res, next) => {
		const result = authMiddleware({req});
		if(!result.user) {
			return res.sendStatus(401)
		}
		next();
	}

	app.post('/post-image-upload', uploadAuth ,upload.single('image'), async function (req, res) {
		 // Convert the uploaded image to jpg format
	// 	await sharp(req.file.path)
	// 		.jpeg() // Convert to jpeg format
	// 		.toFile(`${req.file.path}.jpg`); // Save as new .jpg file
	//  // Delete the original .heic file
	//  	fs.unlinkSync(req.file.path);
		
		const response = {
			message: 'Image uploaded successfully',
			url: req.file.path
			// url: `${req.file.path}.jpg`
		}
		return res.send(response)
	})

	// if we're in production, serve client/build as static assets
	if (process.env.NODE_ENV === 'production') {
		app.use(express.static(path.join(__dirname, '../client/build')));

		app.get('*', (req, res) => {
			res.sendFile(path.join(__dirname, '../client/dist/index.html'));
		});
  	}	

  	db.once('open', () => {
		app.listen(PORT, () => {
			console.log(`API server running on port 3000!`);
			console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
		});
	});
}

startApolloServer();