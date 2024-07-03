import React from "react";
import PrayerTime from "../components/PrayerTime.jsx";

const App = () => {
  return (
    <div className="h-80 w-60">
      <h1 className="text-2xl text-center mb-6">Name</h1>
      <PrayerTime className="my-4 bg-secondary" unitName="Fajr" />
      <PrayerTime className="my-4 bg-secondary" unitName="Dhuhr" />
      <PrayerTime className="my-4 bg-secondary" unitName="Asr" />
      <PrayerTime className="my-4 bg-secondary" unitName="Maghrib" />
      <PrayerTime className="my-4 bg-primary text-white" unitName="Isha" />
    </div>
  );
};

export default App;
