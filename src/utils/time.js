import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function formatPostTime(isoTime) {
  const time = dayjs(isoTime);

  return time.diff(dayjs(), "day") < -1
    ? time.format("DD MMM")
    : time.fromNow();
}
