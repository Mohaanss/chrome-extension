//sample to handle notification
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    unitName: {
      Fajr: false,
      Dhuhr: false,
      Asr: false,
      Maghrib: false,
      Isha: false,
    },
  });
  createDailyAlarm();
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "notifyMorning") {
    showNotification("08:00 AM");
  } else if (alarm.name === "notifyNoon") {
    showNotification("12:00 PM");
  } else if (alarm.name === "notifyAfternoon") {
    showNotification("04:00 PM");
  }
});

function createDailyAlarm() {
  const now = new Date();
  const millisTillMidnight =
    new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0) -
    now;

  chrome.alarms.create("fetchData", {
    when: Date.now() + millisTillMidnight,
    periodInMinutes: 1440,
  });

  createNotificationAlarm("notifyNoon", 22, 36);
}
function createNotificationAlarm(name, hour, minute) {
  const now = new Date();
  const targetTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hour,
    minute,
    0,
    0
  );
  if (targetTime > now) {
    const millisTillTime = targetTime - now;
    chrome.alarms.create(name, {
      when: Date.now() + millisTillTime,
      periodInMinutes: 1440,
    });
  } else {
    console.log(
      `L'heure ${hour}:${minute} est déjà passée aujourd'hui. Aucune alarme créée pour ${name}.`
    );
  }
}

function showNotification(time) {
  chrome.storage.local.get("fetchedData", (result) => {
    const data = result.fetchedData || "Pas de données disponibles";
    chrome.notifications.create({
      type: "basic",
      iconUrl:
        "../../../dist/images/apple-icon-57x57.cd4dd987179efa275648b5ac0d824010.png",
      title: `Notification pour ${time}`,
      message: `Données récupérées: ${data}`,
    });
  });
}
