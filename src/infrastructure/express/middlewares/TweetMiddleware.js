const { body, param, validationResult } = require('express-validator');

const validateTweetCreation = [
    body('message')
        .isString()
        .withMessage('Message must be a string')
        .isLength({ min: 1, max: 280 })
        .withMessage('Message must be between 1 and 280 characters long'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateTweetUpdate = [
    body('message')
        .optional()
        .isString()
        .withMessage('Message must be a string')
        .isLength({ min: 1, max: 280 })
        .withMessage('Message must be between 1 and 280 characters long'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateUserId = [
    param('userId')
        .isString()
        .withMessage('User ID must be a string')
        .notEmpty()
        .withMessage('User ID is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateTweetCreation, validateTweetUpdate, validateUserId };
