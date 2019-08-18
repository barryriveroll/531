const router = require("express").Router();
const userController = require("../../controllers/userController");

router
  .route("/find/:month&:week&:day&:user")
  .get(userController.findUserWorkOuts);
router.route("/save").post(userController.saveData);
router.route("/:user/lastedited").get(userController.getLastEditedDay)

module.exports = router;
