export const getDateDay = () => {
  const date = new Date();

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Bogota",
    weekday: "long",
  });

  const weekdayName = formatter.format(date);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days.indexOf(weekdayName);
};
