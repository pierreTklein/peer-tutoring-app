const notification = require("../assets/audio/notification.mp3");

export function playNotification() {
  const audio = new Audio(notification);
  audio.play();
}
