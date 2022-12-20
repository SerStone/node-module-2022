const router = require('express').Router();

const controller = require("../controller/flat.controller");
const mdlwr = require("../middleware/flat.middleware");



router.get('/', controller.getAllFlats);

router.post('/',mdlwr.isBodyValidCreate,controller.createFlat);

router.get('/:flatId',mdlwr.isIdValid,mdlwr.checkIsFlatExist,controller.getFlatById);


router.put('/:flatId',mdlwr.isIdValid,mdlwr.isBodyValidUpdate,mdlwr.checkIsFlatExist,controller.updateFlat);

router.delete('/:flatId', mdlwr.isIdValid,mdlwr.checkIsFlatExist,controller.deleteFlat);
module.exports = router;