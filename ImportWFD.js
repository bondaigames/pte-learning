const AWS = require("aws-sdk");
const _ = require("lodash");
const fs = require("fs");
const axios = require("axios");

// Load AWS credentials
AWS.config.loadFromPath("./src/awscreds.json");

// Create a new AWS Polly object
var polly = new AWS.Polly();

// polly.describeVoices(function(err, data) {
//   if (err) console.log(err, err.stack);
//   // an error occurred
//   else console.log(data); // successful response
// });

const instance = axios.create({
  baseURL: "https://ptelearning-7266d.firebaseio.com/"
});

instance
  .get("/wfd.json")
  .then(res => {
    //console.log(res.data);
    const getLatestItem = _.findLast(res.data);

    Object.keys(getLatestItem).map((key, index) => {
      if (key !== "createdData" && getLatestItem[key].length > 0 && index > 1) {
        writeTextToFile(key, getLatestItem[key][1]);
      }
    });
  })
  .catch(err => {
    console.log("axios error: " + err);
  });

const writeTextToFile = (fileName, text) => {
  var params = {
    OutputFormat: "mp3", // You can also specify pcm or ogg_vorbis formats.
    Text: text, // This is where you'll specify whatever text you want to render.
    TextType: "text",
    VoiceId: "Joanna" // Specify the voice ID / name from the previous step.
  };

  const saveMp3 = (err, data) => {
    if (err) console.log(err, err.stack);
    // an error occurred
    else {
      console.log(data); // successful response
      fs.writeFile(
        "wfds/audios/" + fileName + ".mp3",
        data.AudioStream,
        function(err) {
          if (err) {
            return console.log(err);
          }
          console.log("the file was saved!");
        }
      );
    }
  };
  polly.synthesizeSpeech(params, saveMp3);
};
