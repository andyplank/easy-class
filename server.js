const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`I'm listening on ${port}`);
});