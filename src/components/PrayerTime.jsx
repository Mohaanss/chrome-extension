import { BellIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

const PrayerTime = (props) => {
  const { className, unitName, ...otherProps } = props;
  const [bell, setBell] = useState(null);

  useEffect(() => {
    chrome.storage.local.get("unitName", (result) => {
      setBell(result["unitName"][unitName]);
    });
  }, []);

  const handleSetBell = () => {
    chrome.storage.local.get("unitName", (result) => {
      setBell(!bell);
      result["unitName"][unitName] = !bell;
      chrome.storage.local.set({ unitName: result.unitName });
    });
  };

  return (
    <div
      className={clsx(
        "flex flex-row  justify-between items-center py-1.5",
        className
      )}
      {...otherProps}
    >
      <div className="w-1/4 text-left px-2">
        <p>{unitName}</p>
      </div>
      <div className="w-1/4 text-center">
        <p>10:00</p>
      </div>
      <div className="w-1/4 flex items-center text-right">
        <span>+10</span>
        <BellIcon
          onClick={handleSetBell}
          width="18"
          height="18"
          className={clsx("pl-1 font-extrabold", bell ? "text-rose-700" : null)}
        />
      </div>
    </div>
  );
};

export default PrayerTime;
