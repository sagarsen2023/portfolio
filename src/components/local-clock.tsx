import { useEffect, useState } from "react";

const formatTime = (timeZone: string) =>
  new Date().toLocaleTimeString("en-GB", { timeZone, hour12: false });

/** 24-hour wall clock for the given IANA time zone, ticking every second. */
function LocalClock({
  timeZone,
  className,
}: {
  timeZone: string;
  className?: string;
}) {
  const [time, setTime] = useState(() => formatTime(timeZone));

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatTime(timeZone)), 1000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return <span className={className}>{time}</span>;
}

export default LocalClock;
