const fs = require('fs');
const express = require('express');

const app = express();

const checkFile = (path) => {
    return fs.existsSync(path);
}

app.get(['/', '/:qid'], function (req, res) {
    const qid = req.params.qid;
    const path = qid ? `./json/${qid}.json` : './json/questions.json';
    if(checkFile(path)) {
        const obj = JSON.parse(fs.readFileSync(path, 'utf8'));
        res.send(obj);
    } else {
        res.status(400).send({
            error: "file not found!"
        })
    }
});

app.listen(3000, () => {
    console.log("App Running!!")
});