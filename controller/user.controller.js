const {fileService} = require('../services');


module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await fileService.findByParams();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const user = await fileService.findByIdWithCars(req.user._id);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const newUserInfo = req.body;
            const userId = req.params.userId;

            const user = await fileService.updateOne(userId, newUserInfo);

            res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const user = await fileService.create(req.body);

            res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            await fileService.deleteOne(req.params.userId);

            res.status(204).send('Oki')
        } catch (e) {
            next(e);
        }
    }
};