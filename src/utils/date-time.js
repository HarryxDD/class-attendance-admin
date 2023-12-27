import moment from "moment";

export const DAY_OF_WEEKS = {
  monday: {
    title: "Monday",
    alias: "MON",
  },
  tuesday: {
    title: "Tuesday",
    alias: "TUE",
  },
  wednesday: {
    title: "Wednesday",
    alias: "WED",
  },
  thursday: {
    title: "Thursday",
    alias: "THU",
  },
  friday: {
    title: "Friday",
    alias: "FRI",
  },
  saturday: {
    title: "Saturday",
    alias: "SAT",
  },
  sunday: {
    title: "Sunday",
    alias: "SUN",
  },
};

export const DATE_FORMAT = "YYYY-MM-DD";
export const LONG_DATE_FORMAT = "DD MMM YYYY";
export const LONG_MONTH_FORMAT = "MMMM DD, YYYY";
export const SHORT_DATE_TIME_FORMAT = "DD/MM HH:mm";
export const SHORT_DATE_FULL_TIME_FORMAT = "DD MMM - LTS";
export const LONG_DATE_TIME_FORMAT = "DD MMM YYYY - LT";
export const CALENDAR_DATE_FORMAT = "YYYY-MM-DD";
export const TIME_FORMAT = "LT";
export const LONG_MONTH_NAME_FORMAT = "DD MMM YYYY";
export const DATE_TIME_24H_FORMAT = "DD.MM.YYYY HH:mm";
export const HOUR_MIN_24H_FORMAT = "H:mm";
export const TIME_ZONE_FORMAT = "HH:mm Z";
export const TIME_24H_FORMAT = "HH:mm";
export const HOUR_24H_FORMAT = "HH";
export const COMBINE_DATE_TIME_FORMAT = `${DATE_FORMAT}LT`;
export const YEAR_FORMAT = "yyyy";

export function formatYear(value) {
  if (!value) {
    return "";
  }
  return moment(value).format(YEAR_FORMAT);
}

export function formatDate(value) {
  if (!value) {
    return "";
  }
  return moment(value).format(DATE_FORMAT);
}

export function formatTime(value) {
  if (!value) {
    return "";
  }
  return moment(value).format(TIME_FORMAT);
}

export function formatShortDateTime(value) {
  if (!value) {
    return "";
  }
  return moment(value).format(SHORT_DATE_TIME_FORMAT);
}

export function formatIOString(time) {
  let momentTime = time;
  if (!(time instanceof moment)) {
    momentTime = moment(time);
  }
  return momentTime.toISOString()?.replace(/[.]\d+/, "");
}

export function formatStartOfDate(value) {
  if (!value) {
    return "";
  }
  // 2022-02-02T00:00:00Z
  let startOfDay = moment.utc(new Date()).clone().startOf("day");
  if (value) {
    startOfDay = moment.utc(value).clone().startOf("day");
  }
  return formatIOString(startOfDay);
}

export function formatEndOfDate(value) {
    if (!value) {
      return "";
    }
    // 2022-02-02T00:00:00Z
    let startOfDay = moment.utc(new Date()).clone().endOf("day");
    if (value) {
      startOfDay = moment.utc(value).clone().endOf("day");
    }
    return formatIOString(startOfDay);
  }
