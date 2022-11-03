import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from './App/Config/index.js';
import routes from './App/Routes/index.js';
import ApiError from './App/api-error.js';
import Mongodb from './App/Utils/mongodb.util.js';

const app = express();

// Setup
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

// Handle error
app.use((req, res, next) => {
   return next(new ApiError(404, 'Resource not found'));
});

app.use((err, req, res, next) => {
   return res.status(err.statusCode || 500).json({
      message: err.message || 'Internal Server Error',
   });
});

async function startServer() {
   try {
      // Connect database
      await Mongodb.connnect(config.db.uri);
      console.log('Connected to the database');

      // Running server
      app.listen(config.PORT, () => {
         console.log(`Server is running on port ${config.PORT}`);
      });
   } catch (error) {
      console.log('Cannot connect to the database !', error);
      process.exit();
   }
}

startServer();
