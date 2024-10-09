const express = require('express');
const connectDB = require('./database/connectionDB');
const swaggerDocs = require('./swagger/swagger');
const errorHandler = require('./express/middlewares/errorHandler');
const UserRepository = require("./repositories/UserRepository");
const JwtAuthService = require("./services/JwtAuthService");

const userRepository = new UserRepository();
const authService = new JwtAuthService('your-secret-key', '1h', userRepository);

const app = express();
app.use(express.json());

const router = require('./express/routes/ApiRoutes')({ authService });

app.use('/api', router);
app.use(errorHandler);

const startServer = (port) => {
    connectDB();
    const server = app.listen(port, () => console.log(`Server running on port ${port}`));
    swaggerDocs(app, port);
    return server;
};

module.exports = { startServer, app };
