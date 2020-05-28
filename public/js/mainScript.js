var firebaseConfig = {
  apiKey: "AIzaSyApoZcuKH_IZnm-8k9S-GC9NPTazSt8ATA",
  authDomain: "asistio-14701.firebaseapp.com",
  databaseURL: "https://asistio-14701.firebaseio.com",
  projectId: "asistio-14701",
  storageBucket: "asistio-14701.appspot.com",
  messagingSenderId: "82396410440",
  appId: "1:82396410440:web:354a81aa37b1194bb35e7d",
  measurementId: "G-9ZBGTZQQ02",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
$(document).ready(function () {
  console.log("Main Script Document is ready");

  firebase
    .database()
    .ref()
    .child("Users")
    .once("value")
    .then((users) => {
      $("#users").text(users.numChildren());
    });

  firebase
    .database()
    .ref()
    .child("Contacts")
    .once("value")
    .then((contacts) => {
      let count = 0;
      contacts.forEach((contact) => {
        count = count + contact.numChildren();
      });
      $("#contacts").text(count);
    });

  firebase
    .database()
    .ref()
    .child("Location")
    .once("value")
    .then((locations) => {
      let count = 0;
      locations.forEach((location) => {
        count = count + location.numChildren();
      });
      $("#locations").text(count);
    });

  firebase
    .database()
    .ref()
    .child("SpeechNotes")
    .once("value")
    .then((notes) => {
      let count = 0;
      notes.forEach((note) => {
        count = count + note.numChildren();
      });
      $("#notes").text(count);
    });

  firebase
    .database()
    .ref()
    .child("UserFiles")
    .once("value")
    .then((files) => {
      console.log("User Files: ", files.numChildren());
      let images = 0;
      let videos = 0;
      let audios = 0;
      let documents = 0;
      files.forEach((user) => {
        user.forEach((userFile) => {
          let uf = userFile.val();
          if (uf.type === "Video") {
            videos++;
          } else if (uf.type === "Image") {
            images++;
          } else if (uf.type === "Audio") {
            audios++;
          } else if (uf.type === "Documents") {
            documents++;
          }

          $("#images").text(images);
          $("#videos").text(videos);
          $("#audios").text(audios);
          $("#documents").text(documents);
        });
      });
    });
});
