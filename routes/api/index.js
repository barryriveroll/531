const router = require("express").Router();
const user = require("./user");

// Book routes
router.use("/users", user);

module.exports = router;
