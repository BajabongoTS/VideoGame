import express,{response, type Request, type Response, type NextFunction} from 'express';
import { gameRouter } from "./game/gameRouter";


const port = process.env.PORT || 3000

const app = express()

app.use('/games', gameRouter);

app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


