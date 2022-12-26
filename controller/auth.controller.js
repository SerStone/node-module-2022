const oauthService = require('../services/oauth.service');
const emailService = require('../services/email.service');
const ActionToken = require('../services/dataBase/ActionToken');
const OAuth = require('../services/dataBase/OAuth');
const User = require('../services/dataBase/User');
const { WELCOME, FORGOT_PASS} = require("../config/email-action.enum");
const {FORGOT_PASSWORD} = require("../config/token-actiom.enum");
const { FRONTEND_URL} = require("../config/config");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user, body} = req;

            await emailService.sendEmail(user.email, WELCOME, { userName: user.name, array: [{ number: 1}, { number: 2}, { number: 3}], condition: false });

            await oauthService.comparePasswords(user.password, body.password);

            const tokenPair  = oauthService.generateAccessTokenPair({id: user._id});

            await OAuth.create({...tokenPair, _user_id: user._id})

            res.json({
                user,
                ...tokenPair
            });
        }catch (e) {
            next(e);
        }
    },
    refresh: async (req, res, next) => {
        try {
            const {refreshToken, _user_id } = req.tokenInfo;

            await OAuth.deleteOne({refreshToken})

            const tokenPair = oauthService.generateAccessTokenPair({id: _user_id})

            await OAuth.create({...tokenPair,_user_id})

            res.status(201).json(tokenPair);
        }catch (e) {
            next(e);
        }
},
    forgotPassword: async (req, res, next) => {
        try {
            const { _id, email, name } = req.user;

            const actionToken = oauthService.generateActionToken(FORGOT_PASSWORD, { email: email });
            const forgotPassFEUrl = `${FRONTEND_URL}/password/new?token=${actionToken}`;

            await ActionToken.create({ token: actionToken, tokenType: FORGOT_PASSWORD, _user_id: _id });
            await emailService.sendEmail(email, FORGOT_PASS, { url: forgotPassFEUrl, userName: name });

            res.json('ok');
        } catch (e) {
            next(e);
        }
    },

    forgotPasswordAfterForgot: async (req, res, next) => {
        try {
            const { user, body } = req;

            const hashPassword = await oauthService.hashPassword(body.password);

            await ActionToken.deleteOne({ token: req.get('Authorization') });
            await User.updateOne({ _id: user._id }, { password: hashPassword });

            res.json('ok');
        } catch (e) {
            next(e);
        }
    }
}