import express from 'express';
import bodyParser from 'body-parser';
import {gameRouter} from "./game/gameRouter";

const port = process.env.PORT || 3000

const app = express()

app.use(bodyParser.json())
app.use('/games', gameRouter);


