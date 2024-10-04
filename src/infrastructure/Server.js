const express = require('express');
const router = require('./express/routes/ApiRoutes');
const connectDB = require('./database/connectionDB');
const swaggerDocs = require('./swagger/swagger');
const errorHandler = require('./express/middlewares/errorHandler');

const app = express();
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

const startServer = (port) => {
    connectDB();
    app.listen(port, () => console.log(`Server running on port ${port}`));
    swaggerDocs(app, port);
};

module.exports = startServer;
