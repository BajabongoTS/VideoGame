import express, {type Request, type Response} from "express";
import {StatusCodes} from "http-status-codes";

const questions = [
    {
        question: "Ma skrzydła, ale nie lata, ma nogi, ale nie chodzi.",
        answer: "Stół",
    },

    {
        question: "Co ma klucz, ale nie otwiera zamka?",
        answer: "Fortepian",
    },
    {
        question: "Latem nosisz, zimą chowasz, chroni przed słońcem i deszczem.",
        answer: "Kapelusz",
    },
    {
        question: "Co rośnie, ale nie żyje?",
        answer: "Góra",
    },
    {
        question: "Co ma serce, ale nie czuje?",
        answer: "Karta",
    },
    {
        question: "Im więcej jej zjadasz, tym bardziej rośnie.",
        answer: "Apetyt",
    },
]

const items = [{type: "Armor", weight: 15},
    {type: "Food", weight: 2},
    {type: "Healing Potion", weight: 1, total: 1},
    {type: "Money", weight: 1, total: 100},
    {type: "Mana Potion", weight: 1, total: 1},
    { type: "Rusty Sword", weight: 5 },
    { type: "Orcish Axe", weight: 7 },
    { type: "Bow", weight: 4 },
    { type: "Arrows", weight: 1, total: 20 },
    { type: "Crossbow", weight: 6 },
    { type: "Bolts", weight: 2, total: 15 },
    { type: "Magic Rune", weight: 1, total: 1 },
    { type: "Scroll of Fireball", weight: 1, total: 1 },
    { type: "Scroll of Ice Block", weight: 1, total: 1 },
    { type: "Wolf Pelt", weight: 3 },
    { type: "Shadowbeast Horn", weight: 4 },
    { type: "Goblin Ear", weight: 1 },
    { type: "Ring of Dexterity", weight: 0.5 },
    { type: "Amulet of Strength", weight: 1 },
    { type: "Lockpick", weight: 0.2, total: 5 },
    { type: "Torch", weight: 1 },
    { type: "Raw Meat", weight: 2 },
    { type: "Cooked Meat", weight: 1 },
    { type: "Herbs", weight: 0.5, total: 3 },
    { type: "Dragonroot", weight: 1 },
    { type: "King's Sorrel", weight: 1 },
    { type: "Pickaxe", weight: 5 },
    { type: "Hunting Knife", weight: 2 },
    { type: "Ale", weight: 3 },
    { type: "Old Coin", weight: 0.5, total: 10 },
    { type: "Silver Chalice", weight: 4 },
    { type: "Ancient Tablet", weight: 5 }]

const locations = ["Dark Forest", "Castle", "Village", "Desert"]
let data = [
    {
        sessionId: 782302793,
        location: "Dark Forest",
        move: "Move in to right",
        explore: "Go in to castle",
        collectItem: false,
        inventory: [
            {type: "Healing Potion", weight: 3, total: 3},
            {type: "Mana Potion", weight: 2, total: 2},
            {type: "Food", weight: 2},
            {type: "Armor", weight: 15}
        ],
        XP: 500,
        totalWeight: 22,
        totalPotions: 5,
        movesMadeTotal: 67,
        movesMadeForQuest: 0,
        questionss: [
            {question: ""}
        ],
        movesMadeForItem: 0,
        movesMadeForLocation: 0


    },
    {
        sessionId: 683748975,
        location: "Desert",
        move: "Move in to left",
        explore: "Go in to Village",
        collectItem: false,
        inventory: [
            {type: "Healing Potion", weight: 4, total: 4},
            {type: "Mana Potion", weight: 1, total: 1},
            {type: "Food", weight: 2},
            {type: "Armor", weight: 15}
        ],
        XP: 100,
        totalWeight: 5,
        totalPotions: 5,
        movesMadeTotal: 67,
        movesMadeForQuest: 0,
        questionss: [
            {question: ""}
        ],
        movesMadeForItem: 0,
        movesMadeForLocation: 0

    }
]


export const gameRouter = express.Router()

gameRouter.post("/start", (request: Request, response: Response) => {

        const a: any = {
            sessionId: Math.floor(Math.random()*999999999+1),
            location: locations[Math.floor(Math.random() * locations.length)],
            move: "Move in to right",
            explore: "Go in to castle",
            collectItem: false,
            inventory: [

            ],
            XP: 0,
            totalWeight: 0,
            totalPotions: 0,
            movesMadeTotal: 0,
            movesMadeForQuest: 0,
            questionss: [
            {question: "", answer: ""}
            ],
            movesMadeForItem: 0,
            movesMadeForLocation: 0
        }

    switch(a.location) {
        case "Dark Forest":
            a.explore = "Go in to castle";
            break;
        case "Castle":
            a.explore = "Go to the blacksmith";
            break;

        case "Village":
            a.explore = "Go in to castle";
            break;

        case "Desert":
            a.explore = "Go in to Village";
            break;
        default:
            response.status(StatusCodes.NOT_FOUND).send({error: "Unknown Location"});
    }

        data.push(a);
        response.status(StatusCodes.CREATED).send(data)

})

gameRouter.get("/:sessionId", (request: Request, response: Response) => {
    try {
        const sessionId = Number.parseInt(request.params.sessionId)
        const item = data.find((ele) => ele.sessionId === sessionId)

        if(!request.params.sessionId){
            response
                .status(StatusCodes.BAD_REQUEST)
                .json({error:"could not found params id"})
        }

        if(item) {
            response.status(StatusCodes.OK).send(item)
        } else {
            response.status(StatusCodes.NOT_FOUND).send({error: "Could not find params id"})
        }
    }
    catch(err) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
})

gameRouter.post('/:sessionId/action',  (request: Request, response: Response) => {
    const sessionId = Number.parseInt(request.params.sessionId)
    const item = data.find((ele) => ele.sessionId === sessionId)

    const movesToMakeForItem = Math.floor(Math.random()*55+1)
    const movesToMakeForLocation = Math.floor(Math.random()*300+1)
    const movesToMadeForQuest = 10;


    if(item) {

        item.move = request.body.move;
        item.movesMadeTotal++;

        item.move = request.body.move;
        item.movesMadeForLocation++;

        item.move = request.body.move;
        item.movesMadeForItem++;

        item.move = request.body.move;
        item.movesMadeForQuest++;


        if(movesToMakeForItem === item.movesMadeForItem || movesToMakeForItem < item.movesMadeForItem) {
                item.movesMadeForItem = 0
                const a = items[Math.floor(Math.random() * items.length)];
                item.inventory.push(a)
                item.totalWeight = a.weight + item.totalWeight
                item.XP = item.XP + 10
            }


            if(movesToMakeForLocation === item.movesMadeForLocation || movesToMakeForLocation < item.movesMadeForLocation){
                item.movesMadeForLocation = 0
                item.location = locations[Math.floor(Math.random() * locations.length)]
                item.XP = item.XP + 25
            }

        if (movesToMadeForQuest === item.movesMadeForQuest) {
            item.movesMadeForQuest = 0;
            const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
            item.questionss = [{ question: randomQuestion.question}];
        }

        if (request.body.answer) {
            const currentQuestion = questions.find(q => q.question === item.questionss[0].question);
            if (currentQuestion && request.body.answer === currentQuestion.answer) {
                item.XP = item.XP + 50
                item.questionss = [{ question: ""}];
            }
        }

        response.status(StatusCodes.OK).send(item)
}
})

gameRouter.get("/:sessionId/inventory", (request: Request, response: Response) => {
    try {
        const sessionId = Number.parseInt(request.params.sessionId)
        const item = data.find((ele) => ele.sessionId === sessionId)

        if(!request.params.sessionId){
            response
                .status(StatusCodes.BAD_REQUEST)
                .json({error:"could not found params id"})
        }

        if(item) {
            response.status(StatusCodes.OK).send(item.inventory)
        } else {
            response.status(StatusCodes.NOT_FOUND).send({error: "Could not find params id"})
        }
    }
    catch(err) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
})

gameRouter.post("/:sessionId/inventory/add", (request: Request, response: Response) => {
        const sessionId = Number.parseInt(request.params.sessionId)
        const item = data.find((ele) => ele.sessionId === sessionId)

    if(item){
        const a = request.body;
        item.inventory.push(a)
        item.totalWeight = a.weight + item.totalWeight
        response.status(StatusCodes.CREATED).send(item)
    }
})


gameRouter.delete('/:sessionId/inventory/remove', (request: Request, response: Response) => {
    // const sessionId = Number.parseInt(request.params.sessionId)
    // const item = data.find((ele) => ele.sessionId === sessionId)
    //
    // if (item) {
    //     const type = request.body;
    //     const itemToRemove: any = item.inventory.find((ele) => ele.type === type);
    //     item.inventory = item.inventory.filter((ele) => ele.type !== type);
    //     item.totalWeight -= itemToRemove.weight ?? 0;
    //     response.status(StatusCodes.OK).json(item);
    // }

    const sessionId = Number.parseInt(request.params.sessionId);
    const player = data.find((ele) => ele.sessionId === sessionId);

    if (!player) {
        response.status(StatusCodes.NOT_FOUND).json({ message: "Session not found" });
    } else {
        const { type } = request.body;
        const itemToRemove = player.inventory.find((ele) => ele.type === type);

        if (!itemToRemove) {
            response.status(StatusCodes.NOT_FOUND).json({ message: "Item not found in inventory" });
        } else {
            player.inventory = player.inventory.filter((ele) => ele.type !== type);
            player.totalWeight -= itemToRemove.weight ?? 0;

            response.status(StatusCodes.OK).json(player);
        }
    }

});