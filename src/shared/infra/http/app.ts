import 'dotenv/config';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { router } from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(router);

export { app };
