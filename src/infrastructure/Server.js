const express = require('express');
const app = express();
app.use(express.json());

const router = require('./express/routes/ApiRoutes');

app.use('/api', router);

const startServer = (port) => {
    const server = app.listen(port, () => console.log(`Server running on port ${port}`));
    return server;
};

module.exports = { startServer, app };
