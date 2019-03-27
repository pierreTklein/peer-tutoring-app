import * as QueryString from "query-string";

function padStart(padNum: number, padValue: string, value: string): string {
  if (value.length < padNum) {
    const pad = String(padValue).repeat(padNum - value.length);
    return pad + value;
  }
  return value;
}

function getNestedAttr(obj: any, nestedAttr: string[]) {
  return nestedAttr.reduce(
    (nested, next) => (nested && nested[next] ? nested[next] : null),
    obj
  );
}

function getOptionsFromEnum(options: any) {
  return Object.keys(options).map(o => ({
    label: options[o],
    value: options[o]
  }));
}

function input2date(date: number) {
  const dateStr = String(date);
  const dateFields = [
    dateStr.substr(0, 2),
    dateStr.substr(2, 2),
    dateStr.substr(4, 4)
  ];
  const formattedDate = new Date(
    Number(dateFields[2]),
    Number(dateFields[0]) - 1,
    Number(dateFields[1])
  );
  return formattedDate.toString();
}

function date2input(date: string | Date) {
  const parsed = new Date(date);
  const day = padStart(2, "0", String(parsed.getDate()));
  const month = padStart(2, "0", String(parsed.getMonth() + 1));
  const year = parsed.getUTCFullYear();
  return `${month}${day}${year}`;
}

function date2age(date: string) {
  const dob = new Date(date);
  const diffMs = Date.now() - dob.getTime();
  const ageDt = new Date(diffMs);
  return Math.abs(ageDt.getUTCFullYear() - 1970);
}

function date2string(date: Date) {
  return date.toLocaleString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  });
}

function getValueFromQuery(key: string): string | undefined {
  const queries: any = QueryString.parse(location.search);
  return queries[key];
}

const toOrdinalSuffix = (num: number) => {
  const int = Math.round(num),
    digits = [int % 10, int % 100],
    ordinals = ["st", "nd", "rd", "th"],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? int + ordinals[digits[0] - 1]
    : int + ordinals[3];
};

function dayOfWeekAsString(dayIndex: number) {
  return ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."][dayIndex];
}
function hourAsString(hourIndex: number) {
  if (hourIndex < 10) {
    return `0${hourIndex}:00`;
  } else {
    return `${hourIndex}:00`;
  }
}

function dictToArray(dict: { [key: string]: any }) {
  const list = [];
  for (var key in dict) {
    if (dict.hasOwnProperty(key)) {
      list.push({ key, value: dict[key] });
    }
  }
  return list.sort((a, b) => b.value - a.value);
}

export {
  date2age,
  date2input,
  date2string,
  dayOfWeekAsString,
  dictToArray,
  getNestedAttr,
  getOptionsFromEnum,
  getValueFromQuery,
  hourAsString,
  input2date,
  padStart,
  toOrdinalSuffix
};
