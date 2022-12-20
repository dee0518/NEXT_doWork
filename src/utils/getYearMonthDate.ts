const getYearMonthDate = (selectedDate: Date) => {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const date = selectedDate.getDate();

  return { year, month, date };
};

export default getYearMonthDate;
