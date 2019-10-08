import icon from "../assets/images/logo/logo_icon_color.png";
import badge from "../assets/images/logo/logo_icon_grey.png";
import { URL } from "../config";

const notification = require("../assets/audio/notification.mp3");

export async function playNotification() {
  try {
    const audio = new Audio(notification);
    await audio.play();
  } catch (e) {
    return;
  }
}

export function requestPermission() {
  if (
    "Notification" in window &&
    Notification.permission !== "denied" &&
    Notification.permission !== "granted"
  ) {
    Notification.requestPermission();
  }
}

function triggerNotification(title: string, message: string) {
  const notification = new Notification(title, {
    badge,
    body: message,
    icon
  });
  notification.onclick = (event: Event) => {
    event.preventDefault(); // prevent the browser from focusing the Notification's tab
    window.open(URL, "_blank");
  };
}

export async function desktopNotification(title: string, message: string) {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    triggerNotification(title, message);
    return true;
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      triggerNotification(title, message);
      return true;
    }
  }
  return false;
  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}
