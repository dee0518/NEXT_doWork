const getYearMonthDate = (selectedDate: Date) => {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const date = selectedDate.getDate();

  return { year, month, date };
};

const changeDate = (date: Date): string =>
  `${date.getFullYear()}.${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}.${
    date.getDate() < 10 ? '0' : ''
  }${date.getDate()}`;

export { getYearMonthDate, changeDate };
