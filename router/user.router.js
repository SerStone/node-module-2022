const router = require('express').Router();
const mdlwr = require("../middleware/user.middleware");
const authMdlwr = require("../middleware/auth.middleware");
const userController  = require("../controller/user.controller");


router.get('/', userController.getAllUsers);
router.post('/', mdlwr.isNewUserValid,mdlwr.checkIsEmailUnique, userController.createUser);

router.get('/:userId', mdlwr.isUserIdValid,authMdlwr.checkAccessToken,mdlwr.getUserDynamically('userId','params','_id'), userController.getUserById);
router.put('/:userId',  mdlwr.isUserIdValid,mdlwr.isEditUserValid,authMdlwr.checkAccessToken,mdlwr.getUserDynamically('userId','params','_id'), userController.updateUser);
router.delete('/:userId',mdlwr.isUserIdValid,authMdlwr.checkAccessToken, userController.deleteUserById);

module.exports = router;