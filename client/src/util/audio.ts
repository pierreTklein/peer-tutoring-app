const notification = require("../assets/audio/notification.mp3");

export async function playNotification() {
  try {
    const audio = new Audio(notification);
    await audio.play();
  } catch (e) {
    return;
  }
}
