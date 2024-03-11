const { ApolloServer } = require('@apollo/server');
const convert = require('heic-convert');
const dotenv = require('dotenv');
const express = require('express');
const { expressMiddleware } = require('@apollo/server/express4');
const multer = require('multer');
const path = require('path');
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

const app = express();
const server = new ApolloServer({
	typeDefs,
	resolvers,
});

dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
	credentials: {
		accessKeyId: accessKey,
		secretAccessKey: secretAccessKey,
	},
	region: bucketRegion,
})

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

const startApolloServer = async () => {
	await server.start();

	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());

	app.use('/graphql', expressMiddleware(server, {
		context: authMiddleware
		}
	));
	
	const auth = (req, res, next) => {
		const result = authMiddleware({req});
		if(!result.user) {
			return res.sendStatus(401)
		}
		next();
	}

	app.post('/post-image-upload', auth, upload.single('image'), async (req, res) => {
		try {
			const file = req.file
			
			let fileBuffer;

			if(file.mimetype === 'image/heic') {
				fileBuffer = await convert({
					buffer: file.buffer, // the HEIC file buffer
					format: 'JPEG',       // output format
					quality: 0
				});
			} else {
				fileBuffer = file.buffer
			}

			const imageName = file.originalname + '-' + Date.now()
			
			const putObjectParams = {
				Bucket: bucketName,
				Key: imageName, 
				Body: fileBuffer,
				ContentType: file.mimetype
			}
			
			const putCommand = new PutObjectCommand(putObjectParams)
			
			await s3.send(putCommand)
	
			const getObjectParams = {
				Bucket: bucketName,
				Key: imageName
			}

			const getCommand = new GetObjectCommand(getObjectParams);
			const url = await getSignedUrl(s3, getCommand, {expiresIn: 604800})
			
			const response = {
				message: 'Image uploaded successfully',
				url: url
			}
	
			console.log(req.file)
	
			return res.send(response)
		} catch (error) {
			console.log(error)
		}
	});

	app.put('/delete/:id', auth, async (req, res) => {
		const imageName = req.body.imageName;

		const deleteParams = {
			Bucket: bucketName,
			Key: imageName
		}
		const command = new DeleteObjectCommand(deleteParams)
		
		await s3.send(command)

		const response = {
			message: 'post deleted successfully'
		}

		return res.send(response)
	});

	// if we're in production, serve client/build as static assets
	if (process.env.NODE_ENV === 'production') {
		app.use(express.static(path.join(__dirname, '../client/dist')));

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