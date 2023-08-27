export const currentDate = () => {
  const date = new Date();

  const monthNames = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();

  const formattedDate = `${day} ${month}, ${year} | ${hour
    .toString()
    .padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

  return formattedDate;
};
