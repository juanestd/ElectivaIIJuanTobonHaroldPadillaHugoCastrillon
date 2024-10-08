const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../../../adapters/controllers/authControllers");
const { validateRegister, validateLogin } = require("../middlewares/middlewareAuth");

router.post('/auth/register', validateRegister, registerUser);
router.post('/auth/login', validateLogin, loginUser);

module.exports = router;
