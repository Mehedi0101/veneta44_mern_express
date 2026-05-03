import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import config from './app/config';

const app: Application = express();

// --- Middlewares & Routes ---
const corsOrigins = config.cors_origin ? config.cors_origin.split(',') : ['*'];

app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  }),
);
app.use(cookieParser());

// --- Parsers ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- API Routes ---
app.use('/api/v1', router);

/**
 * Health check / Home route
 */
app.get('/', (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Welcome to 22Veg API',
    data: {
      service: '22Veg Backend API',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
      endpoints: {
        health: '/health',
        api: '/api/v1',
      },
    },
  });
});

// --- Error Handling ---

// Global error handler
app.use(globalErrorHandler);

// Handle not found
app.use(notFound);

export default app;
