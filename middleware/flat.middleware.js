const apiError = require("../error/ApiError");
const {flatFileService} = require('../services');

module.exports = {
    checkIsFlatExist: async (req, res, next) => {
        try {
            const {flatId} = req.params;

            const flats = await flatFileService.reader();
            const flatter = flats.find((u) => u.id === +flatId);
            if (!flatter) {
                throw new apiError('Sry can not find this flat:( ', 404)
            }

            req.flats = flats;
            req.flatter = flatter;
            next();

        }catch (e) {
            next(e)
        }
    },
    isBodyValidCreate: (req, res, next) => {
        try {
            const { name,rooms, price } = req.body;
            if (!name || name.length < 3 || typeof name !== 'string') {
                throw new apiError('Wrong name', 400);
            }

            if (!rooms || rooms < 0 || Number.isNaN(+rooms)) {
                throw new apiError('Wrong flat', 400);
            }
            if (!price || price < 700000 || Number.isNaN(+price)) {
                throw new apiError('Wrong flat', 400);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    isBodyValidUpdate: (req, res, next) => {
        try {
            const { name,rooms, price } = req.body;
            if (name && (name.length < 3 || typeof name !== 'string')) {
                throw new apiError('Wrong name', 400);
            }

            if (!rooms || rooms < 0 || Number.isNaN(+rooms)) {
                throw new apiError('Wrong room', 400);
            }
            if (!price || price < 700000 || Number.isNaN(+price)) {
                throw new apiError('Wrong price', 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isIdValid: (req, res, next) => {
        try {
            const { flatId } = req.params;

            if (flatId < 0 || Number.isNaN(+flatId)) {
                throw new apiError('Not valid ID', 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}