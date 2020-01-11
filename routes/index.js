var express = require('express');
var router = express.Router();
var firebase = require('firebase');
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECCT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};
firebase.initializeApp(firebaseConfig);
/* GET home page. */
router.get('/', function (req, res) {
  res.render('pages/login', { error: "" });   // res.render displays page
});


router.post('/login', function (req, res) {
  firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then(r => {
    var id = req.body.email.replace("@", "-");
    id = req.body.id.replace(/\./g, "_");
    firebase.database().ref().child("Admins").child(id).once('value').then(data => {
      if (data === null || data === undefined || data.val() === null || data.val() === undefined) {

        res.render('pages/login', { error: "you are not autherized to login here 🤨" });
      }
      else {
        req.session.id = data.val().id;
        req.session.name = data.val().name;
        req.session.email = req.body.email;

        res.json("1");                                                    // print value that pass

      };

    }).catch(error => {
      res.render('pages/login', { error: "you are not autherized to login here 🤨" });

    })

  }).catch(e => {
    res.render('pages/login', { error: e.message });
  })
});

module.exports = router;
