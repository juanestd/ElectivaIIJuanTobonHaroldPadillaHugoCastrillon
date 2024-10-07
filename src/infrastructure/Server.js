const express = require('express');
const connectDB = require('./database/connectionDB');
const swaggerDocs = require('./swagger/swagger');
const errorHandler = require('./express/middlewares/errorHandler');
const UserRepository = require("./repositories/UserRepository");
const JwtAuthService = require("./services/JwtAuthService");
const TokenBlacklist = require("./utils/TokenBlacklist");

const userRepository = new UserRepository();
const authService = new JwtAuthService('your-secret-key', '1h', userRepository);
const tokenBlacklist = new TokenBlacklist();

const router = require('./express/routes/ApiRoutes')({ authService, tokenBlacklist });

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
