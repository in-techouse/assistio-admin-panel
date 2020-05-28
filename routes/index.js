var express = require("express");
var router = express.Router();
var firebase = require("firebase");
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECCT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};
firebase.initializeApp(firebaseConfig);

/* GET home page. */
router.get("/", function (req, res) {
  if (req.session.adminId && req.session.adminId.length > 0) {
    res.redirect("/admin");
  }
  res.render("pages/login", { error: "" });
});

router.post("/login", function (req, res) {
  if (req.session.adminId && req.session.adminId.length > 0) {
    res.redirect("/admin");
  }
  firebase
    .auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((r) => {
      var id = req.body.email.replace("@", "-");
      id = id.replace(/\./g, "_");
      firebase
        .database()
        .ref()
        .child("Admins")
        .child(id)
        .once("value")
        .then((data) => {
          if (
            data === null ||
            data === undefined ||
            data.val() === null ||
            data.val() === undefined
          ) {
            res.render("pages/login", {
              error: "You are not autherized to login here 🤨",
            });
          } else {
            req.session.adminId = data.val().id;
            req.session.adminName = data.val().name;
            req.session.adminEmail = req.body.email;
            res.redirect("/admin");
          }
        })
        .catch((error) => {
          res.render("pages/login", {
            error: "You are not autherized to login here 🤨",
          });
        });
    })
    .catch((e) => {
      res.render("pages/login", { error: e.message });
    });
});

router.get("/logout", function (req, res) {
  firebase.auth().signOut();
  req.session.destroy(function (err) {
    if (err) {
      res.negotiate(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
