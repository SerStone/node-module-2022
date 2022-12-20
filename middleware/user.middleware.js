const ApiError = require("../error/ApiError");
const {fileService} = require('../services');

module.exports = {
    checkIsUserExist: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const users = await fileService.reader();
            const user = users.find((u) => u.id === +userId);
            if (!user) {
                throw new ApiError('Sry can not find this user:( ', 404)
            }

            req.users = users;
            req.user = user;
            next();

        }catch (e) {
         next(e)
        }
    },
    isBodyValidCreate: (req, res, next) => {
        try {
            const { name, age } = req.body;
            if (!name || name.length < 3 || typeof name !== 'string') {
                throw new ApiError('Wrong name', 400);
            }

            if (!age || age < 0 || Number.isNaN(+age)) {
                throw new ApiError('Wrong age', 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isBodyValidUpdate: (req, res, next) => {
        try {
            const { name, age } = req.body;
            if (name && (name.length < 3 || typeof name !== 'string')) {
                throw new ApiError('Wrong name', 400);
            }

            if (age && (age < 0 || Number.isNaN(+age))) {
                throw new ApiError('Wrong age', 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isIdValid: (req, res, next) => {
        try {
            const { userId } = req.params;

            if (userId < 0 || Number.isNaN(+userId)) {
                throw new ApiError('Not valid ID', 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}