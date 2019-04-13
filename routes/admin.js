const express = require('express');
const router  = express.Router();

router.get("/login", (req, res, next) => {
  res.render("admin/login");
});


module.exports = router;