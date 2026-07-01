export const playAudio = (text, onEnd) => {
  if (!window.speechSynthesis) {
    console.error("Speech Synthesis is not supported in this browser");
    onEnd?.();
    return;
  }

  let utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 1;
  utterance.volume = 1;
  utterance.pitch = 1;

  const storedVoiceURI = localStorage.getItem("ai_voice_uri");
  if (storedVoiceURI) {
    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find(v => v.voiceURI === storedVoiceURI);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
  }

  utterance.onend = () => {
    onEnd?.();
  };

  window.speechSynthesis.cancel(); // stop previous speech
  window.speechSynthesis.speak(utterance);
};
