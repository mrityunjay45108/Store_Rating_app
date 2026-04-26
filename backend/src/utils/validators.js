const { body, validationResult } = require('express-validator');

const validateName = (field = 'name') => {
    return body(field)
        .trim()
        .isLength({ min: 20, max: 60 })
        .withMessage(`${field} must be between 20 and 60 characters`);
};
const validateEmail = () => {
    return body('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email');
};
const validatePassword = () => {
    return body('password')
        .isLength({ min: 8, max: 16 })
        .withMessage('Password must be 8-16 characters')
        .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/)
        .withMessage('Password must contain at least one uppercase letter and one special character');
};
const validateAddress = () => {
    return body('address')
        .trim()
        .isLength({ max: 400 })
        .withMessage('Address must not exceed 400 characters');
};
const validateRating = () => {
    return body('rating')
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be between 1 and 5');
};
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
module.exports = {
    validateName,
    validateEmail,
    validatePassword,
    validateAddress,
    validateRating,
    handleValidationErrors
};