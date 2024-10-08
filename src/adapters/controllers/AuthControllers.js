const users = require('../../core/domain/mocks/AuthMocks');

const registerUser = (req, res) => {
    const { username, password } = req.body;
    const user = { id: new Date().getMilliseconds(), username, password };
    users.push(user);
    res.status(201).json({ message: "User registered successfully", user });
};

const loginUser = (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        res.status(200).json({status: "ok", message: "Login successful", user });
    } else {
        res.status(401).json({status: "error", message: "Invalid credentials" });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
