import express from 'express';
import bodyParser from 'body-parser';
import {StatusCodes} from 'http-status-codes';

connectDB();

const port = process.env.PORT || 3000

const app = express()

app.use(bodyParser.json())
app.use('/games', gameRouter);


app.listen(ENV.PORT, () => {
	console.log(`Server is running on port: ${port}`);
    })

