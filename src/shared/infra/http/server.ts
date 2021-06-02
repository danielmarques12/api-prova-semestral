import { app } from './app';
import 'dotenv/config';

app.listen(process.env.PORT, () => '👨‍💻 Server is running');
