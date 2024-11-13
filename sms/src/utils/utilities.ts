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


