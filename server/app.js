import express from 'express';
import * as Sentry from '@sentry/node';
import bodyParser from 'body-parser';
import Routes from './src/routes/twilio.route';
const app = express();

// use sentry
Sentry.init({ dsn: 'https://8b1faf455e104c4b8faf849fd99d8299@o414829.ingest.sentry.io/5305014' });
app.use(Sentry.Handlers.requestHandler());

// Use body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// routes
app.use('/api/twilio', Routes);

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

export default app;