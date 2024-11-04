export const getPresent = (
  attendence: any[],
  day: number,
  month: number
): boolean => {
  const res = attendence.find(
    (d) => d.date.getDate() === day && d.date.getMonth() + 1 == month
  );

  if (res) {
    return true;
  }
  return false;
};

export const getDaysOfCurrentMonth = () => {
  const date = new Date();
  const daysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return { days };
};
