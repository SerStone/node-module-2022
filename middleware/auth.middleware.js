const OAuth = require('../services/dataBase/OAuth');
const ActionToken = require('../services/dataBase/ActionToken');
const authValidator = require('../validator/auth.validator');
const oauthService = require("../services/oauth.service");

const ApiError = require("../error/ApiError");
const { tokenTypeEnum } = require('../enum');
const emailService = require('../services/email.service');
const { FORGOT_PASS } = require("../config/email-action.enum");
const { FORGOT_PASSWORD } = require("../config/token-actiom.enum");

module.exports = {
    isBodyValid: async (req, res, next) => {
        try {
            const validate = authValidator.loginValidator.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            await emailService.sendEmail('tytu15547@gmail.com',FORGOT_PASS)

            const accessToken = req.get('Authorization');

            if (!accessToken) {
                throw new ApiError('No token', 401);
            }

            oauthService.checkToken(accessToken);

            const tokenInfo = await OAuth.findOne({ accessToken });

            if (!tokenInfo) {
                throw new ApiError('Token not valid', 401);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.get('Authorization');

            if (!refreshToken) {
                throw new ApiError('No token', 401);
            }

            oauthService.checkToken(refreshToken, tokenTypeEnum.refreshToken);

            const tokenInfo = await OAuth.findOne({ refreshToken });

            if (!tokenInfo) {
                throw new ApiError('Token not valid', 401);
            }

            req.tokenInfo = tokenInfo;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkActionToken: async (req, res, next) => {
        try {
            const actionToken = req.get('Authorization');

            if (!actionToken) {
                throw new ApiError('No token', 401);
            }

            oauthService.checkActionToken(actionToken, FORGOT_PASSWORD);

            const tokenInfo = await ActionToken
                .findOne({ token: actionToken, tokenType: FORGOT_PASSWORD })
                .populate('_user_id');

            if (!tokenInfo) {
                throw new ApiError('Token not valid', 401);
            }

            req.user = tokenInfo._user_id;

            next();
        } catch (e) {
            next(e);
        }
    }
}