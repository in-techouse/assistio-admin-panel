var express = require("express");
var router = express.Router();
var firebase = require("firebase");

router.get("/", function (req, res) {
  if (!req.session.adminId) {
    res.redirect("/");
  }
  res.render("pages/index");
});
router.get("/all_users", function (req, res) {
  if (!req.session.adminId) {
    res.redirect("/");
  }

  firebase
    .database()
    .ref()
    .child("Users")
    .orderByKey()
    .once("value")
    .then((d) => {
      res.render("pages/all_users", { data: d });
    })
    .catch((e) => {
      res.render("pages/all_users", { data: [] });
    });
});
router.get("/userDetail", function (req, res) {
  if (!req.session.adminId) {
    res.redirect("/");
  }

  firebase
    .database()
    .ref()
    .child("Users")
    .child(req.query.id)
    .once("value")
    .then((d) => {
      res.render("pages/user", { user: d.val() });
    })
    .catch((e) => {
      res.render("/admin/all_users");
    });
});

module.exports = router;
