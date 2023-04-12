const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");
// console.log(msg);
msg.text = document.querySelector('[name="text"]').value;

const populateVoices = function (e) {
  voices = this.getVoices();
  // console.log(voices);

  const voicesList = voices
    .filter((voice) => voice.lang.includes("en"))
    .map(
      (voice) =>
        `<option value="${voice.name}">${voice.name} ${voice.lang}</option>`
    )
    .join("");
  voicesDropdown.innerHTML = voicesList;
};

const setCustomVoice = function () {
  console.log(this.value);
  msg.voice = voices.find((voice) => voice.name === this.value);
};

const toggleSpeech = function (startOver = true) {
  speechSynthesis.cancel(); // this cancels the speech recognition upon a different selection of voice.
  if (startOver) speechSynthesis.speak(msg);
};

const setFeatures = function (e) {
  // console.log(this.name, this.value);
  msg[this.name] = this.value; // !important to understand: the voice in the current msg gets the value of the rate/pitch/textArea option.
};

speechSynthesis.addEventListener("voiceschanged", populateVoices);
voicesDropdown.addEventListener("change", setCustomVoice);
options.forEach((option) => option.addEventListener("change", setFeatures));
speakButton.addEventListener("click", toggleSpeech);
stopButton.addEventListener("click", () => toggleSpeech(false));
// OR
// stopButton.addEventListener("click", toggleSpeech.bind(null, false)); // Using bind method to toggle speech.
