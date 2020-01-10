var express = require('express');
var router = express.Router();
var firebase = require('firebase');
const firebaseConfig = {
  apiKey: "AIzaSyApoZcuKH_IZnm-8k9S-GC9NPTazSt8ATA",
  authDomain: "asistio-14701.firebaseapp.com",
  databaseURL: "https://asistio-14701.firebaseio.com",
  projectId: "asistio-14701",
  storageBucket: "asistio-14701.appspot.com",
  messagingSenderId: "82396410440",
  appId: "1:82396410440:web:354a81aa37b1194bb35e7d",
  measurementId: "G-9ZBGTZQQ02"
};
firebase.initializeApp(firebaseConfig);
/* GET home page. */
router.get('/', function(req, res) {
  res.render('pages/login', {error: ""});
});


router.post('/login', function(req, res) {
 res.json("1")
});

module.exports = router;
