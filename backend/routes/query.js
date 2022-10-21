const express = require("express");

const router = express.Router();

const query = require("../queries/query");

router.get(
    "",
    query.getImage
  );
  
  module.exports = router;