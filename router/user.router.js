const router = require('express').Router();
const mdlwr = require("../middleware/user.middleware");
const {userController}  = require("../controller");


router.get('/', userController.getAllUsers);
router.post('/', mdlwr.isBodyValidCreate,mdlwr.userNormalizator,mdlwr.checkIsEmailUnique, userController.createUser);

router.get('/:userId', mdlwr.checkIsUserExist, userController.getUserById);
router.put('/:userId', mdlwr.isBodyValidUpdate,mdlwr.userNormalizator, mdlwr.checkIsUserExist, userController.updateUser);
router.delete('/:userId', userController.deleteUserById);

module.exports = router;