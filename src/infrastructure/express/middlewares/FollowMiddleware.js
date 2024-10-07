const { param, body, validationResult } = require('express-validator');

const validateFollowerId = [
    param('followerId').notEmpty().withMessage('Follower ID is required.'),
    (req, res, next) => {
        console.log('validateFollowerId middleware triggered');
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log('Validation errors in validateFollowerId:', errors.array());
                return res.status(400).json({ errors: errors.array() });
            }
            console.log('No validation errors in validateFollowerId');
            console.log('About to call next() in validateFollowerId');
            next();
        } catch (error) {
            console.error('Error in validateFollowerId middleware:', error);
            res.status(500).json({ message: 'Internal server error in validateFollowerId' });
        }
    },
];

const validateFollowingId = [
    param('followingId').notEmpty().withMessage('Following ID is required.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateUserId = [
    param('userId').notEmpty().withMessage('User ID is required.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateUsername = [
    body('username').notEmpty().withMessage('Username is required.'),
    (req, res, next) => {
        console.log('validateUsername middleware triggered');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation errors in validateUsername:', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }
        console.log('No validation errors in validateUsername');
        next();
    }
];

module.exports = { validateFollowerId, validateFollowingId, validateUserId, validateUsername };
