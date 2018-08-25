const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const firebase = require('firebase');
const cors = require('cors');
const firebase_auth = require('./auth/firebase_auth.js');


// Google Cloud Speech API
//const mic = require('mic');
const fs = require('fs');
// const speech = require('@google-cloud/speech');
// // Creates a client
// const client = new speech.SpeechClient();
//const filename = '/path/to/audio.raw';
const encoding = 'Encoding of the audio file, e.g. LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'BCP-47 language code, e.g. en-US';
const config = {
  encoding: encoding,
  sampleRateHertz: sampleRateHertz,
  languageCode: languageCode,
};
// const audio = {
//   content: fs.readFileSync(filename).toString('base64'),
// };

// const request = {
//   config: config,
//   audio: audio,
// };

const app = express();
const port = process.env.PORT || 8080;

// ------------------------
// FIREBASE
// ------------------------
// Gear icon in left sidebar > General > Add Firebase to your Web App
// Don't bother with config variable
// npm install firebase and import it
firebase.initializeApp(firebase_auth);

// Reference to database, this is automatically the root
const user_data = firebase.app().database().ref().child("user_data");
const user_identities = firebase.app().database().ref().child("user_identities");
const cg_identities = firebase.app().database().ref().child("cg_identities");

app.get("/signup", async (req, res) => {
//app.post("/authenticate", async (req, res) => {
  //console.log(req);
	let username = req.query.username;
	let password = req.query.password;
  let email = req.query.email;
  const min = 10000000000000;
  const max = 99999999999999;
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
	user_identities.child(username).push(password);
  user_identities.child(username).push(email);
  user_identities.child(username).push(num);
});

app.get("/authenticate", async (req, res) => {
//app.post("/authenticate", async (req, res) => {
  //console.log(req);
  let username = req.query.username;
  let password = req.query.password;

  user_identities.once('value', async function(data) {

    /*
    waiting_links = Object.keys(data.val());

    if (contains_elem(req.query.hash, waiting_links) != -1) {
      moveFbRecord(verify_links.child(req.query.hash), tracked_courses);
      res.sendFile(path.join(__dirname, 'client/extra/verified.html'));
    } else {
      res.sendFile(path.join(__dirname, 'client/extra/unverified.html'));
    }
    */
  })
});

// Detects speech in the audio file
// client
//   .recognize(request)
//   .then(data => {
//     const response = data[0];
//     const transcription = response.results
//       .map(result => result.alternatives[0].transcript)
//       .join('\n');
//     console.log(`Transcription: `, transcription);
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });

//   var micInstance = mic({
//     rate: '16000',
//     channels: '1',
//     debug: true,
//     exitOnSilence: 6
// });
// var micInputStream = micInstance.getAudioStream();
 
// var outputFileStream = fs.WriteStream('output.raw');
 
// micInputStream.pipe(outputFileStream);
 
// micInputStream.on('data', function(data) {
//     console.log("Recieved Input Stream: " + data.length);
// });
 
// micInputStream.on('error', function(err) {
//     cosole.log("Error in Input Stream: " + err);
// });
 
// micInputStream.on('startComplete', function() {
//     console.log("Got SIGNAL startComplete");
//     setTimeout(function() {
//             micInstance.pause();
//     }, 5000);
// });
    
// micInputStream.on('stopComplete', function() {
//     console.log("Got SIGNAL stopComplete");
// });
    
// micInputStream.on('pauseComplete', function() {
//     console.log("Got SIGNAL pauseComplete");
//     setTimeout(function() {
//         micInstance.resume();
//     }, 5000);
// });
 
// micInputStream.on('resumeComplete', function() {
//     console.log("Got SIGNAL resumeComplete");
//     setTimeout(function() {
//         micInstance.stop();
//     }, 5000);
// });
 
// micInputStream.on('silence', function() {
//     console.log("Got SIGNAL silence");
// });
 
// micInputStream.on('processExitComplete', function() {
//     console.log("Got SIGNAL processExitComplete");
// });
 
// micInstance.start();
// micInstance.pause();

app.use(cors({origin: 'http://localhost:3000'}));
app.listen(port);

app.use(express.static(path.join(__dirname, 'client/build')));