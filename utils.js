
const asyncHandler = (handler) => (req, res, next) => handler(req, res ,next).catch(next);
const cookieParser = require('cookie-parser')
const csrf = require('csurf');
const csrfProtection = csrf({extended: true})

module.exports = {
    asyncHandler,
    cookieParser,
    csrfProtection
}
