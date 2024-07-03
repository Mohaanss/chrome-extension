/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./src/service/worker.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.set({
    unitName: {
      Fajr: false,
      Dhuhr: false,
      Asr: false,
      Maghrib: false,
      Isha: false
    }
  });
  createDailyAlarm();
});
chrome.alarms.onAlarm.addListener(function (alarm) {
  if (alarm.name === "notifyMorning") {
    showNotification("08:00 AM");
  } else if (alarm.name === "notifyNoon") {
    showNotification("12:00 PM");
  } else if (alarm.name === "notifyAfternoon") {
    showNotification("04:00 PM");
  }
});
function createDailyAlarm() {
  var now = new Date();
  var millisTillMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0) - now;
  chrome.alarms.create("fetchData", {
    when: Date.now() + millisTillMidnight,
    periodInMinutes: 1440
  });
  createNotificationAlarm("notifyNoon", 22, 36);
}
function createNotificationAlarm(name, hour, minute) {
  var now = new Date();
  var targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0);
  if (targetTime > now) {
    var millisTillTime = targetTime - now;
    chrome.alarms.create(name, {
      when: Date.now() + millisTillTime,
      periodInMinutes: 1440
    });
  } else {
    console.log("L'heure ".concat(hour, ":").concat(minute, " est d\xE9j\xE0 pass\xE9e aujourd'hui. Aucune alarme cr\xE9\xE9e pour ").concat(name, "."));
  }
}
function showNotification(time) {
  chrome.storage.local.get("fetchedData", function (result) {
    var data = result.fetchedData || "Pas de données disponibles";
    chrome.notifications.create({
      type: "basic",
      iconUrl: "../../../dist/images/apple-icon-57x57.cd4dd987179efa275648b5ac0d824010.png",
      title: "Notification pour ".concat(time),
      message: "Donn\xE9es r\xE9cup\xE9r\xE9es: ".concat(data)
    });
  });
}
/******/ })()
;
//# sourceMappingURL=worker.bundle.js.map