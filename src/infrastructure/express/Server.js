const express = require('express');
const router = require('./routes/apiRoutes');
const connectDB = require('../database/connectionDB');

const app = express();
app.use(express.json());
app.use('/api', router);

const startServer = (port) => {
    connectDB();
    app.listen(port, () => console.log(`Server running on port ${port}`));
};

module.exports = startServer;
