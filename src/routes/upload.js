"use strict";
const router = require("express").Router();
const uploadMiddleware = require("../middlewares/upload")


// routes/upload:

const upload = require("../controllers/upload");
const { isAdmin, isLogin } = require("../middlewares/permissions");

// URL: /uploads

router.route("/").get(upload.list).post(isLogin, uploadMiddleware.multiple, upload.create);
// router.route("/").get(upload.list).post(isLogin, uploadMiddleware.single('file'), upload.create);

router
  .route("/:uploadId")
  .get(upload.read)
  .put(isLogin, upload.update)
  .patch(isLogin, upload.update)
  .delete(isAdmin, upload.delete);

/* ------------------------------------------------------- */
module.exports = router;
