const express = require('express');


const server = express();

server.use(express.json());

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

function checkCard(req, res, next) {
    const {id} = req.params;
    const card = cards.find(card => card.id == id);

    if(!card) {
        return res.json({error: "card not found."});
    }

    next();
};

let nextId= 1;
const cards = [];

//routes
server.get("/", (req, res) => {
    return res.json({result: "API-teste_node"});
});

server.get("/cards", (req, res) =>{
    return res.json(cards);
});

server.post("/cards", (req, res) => {
    const {title, content} = req.body;
    const card = {
        id: nextId,
        title,
        content
    };

    cards.push(card);

    nextId++;
    
    return res.json(card);
});

server.put("/cards/:id", checkCard, (req, res) => {
    const {id} = req.params;
    const {title, content} = req.body;

    const card = cards.find(card => card.id == id);

    if(title) {
        card.title = title;
    }

    if(content) {
        card.content = content;
    }

    return res.json(card);

});

server.delete("/cards/:id", checkCard, (req, res) => {
    const {id} = req.params;

    const cardIndex = cards.findIndex(card => card.id == id);

    cards.splice(cardIndex, 1);

    res.json(cards);
});

server.listen(3333);
