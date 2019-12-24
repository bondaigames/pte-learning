var AWS = require("aws-sdk");

// Load AWS credentials
AWS.config.loadFromPath("./src/awscreds.json");

// Create a new AWS Polly object
var polly = new AWS.Polly();

polly.describeVoices(function(err, data) {
  if (err) console.log(err, err.stack);
  // an error occurred
  else console.log(data); // successful response
});

var params = {
  OutputFormat: "mp3", // You can also specify pcm or ogg_vorbis formats.
  Text: "Good morning, Trevor.", // This is where you'll specify whatever text you want to render.
  TextType: "text",
  VoiceId: "Joanna" // Specify the voice ID / name from the previous step.
};

const saveMp3 = (err, data) => {
  if (err) console.log(err, err.stack);
  // an error occurred
  else console.log(data); // successful response
};
const test = () => {
  polly.synthesizeSpeech(params, saveMp3);
};
