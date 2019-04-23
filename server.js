const express = require('express');
const app = express();
const router = require('./server_src/routes');

app.use(express.static('public'));
app.use('/', router);

const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`I'm listening on ${port}`);
});

module.exports = app;
