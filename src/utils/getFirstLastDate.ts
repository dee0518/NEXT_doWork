const getFirstLastDate = (date: Date, dates: number[]) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const startMonth = dates[0] === 1 ? month : month - 1;
  const endMonth = dates[dates.length - 1] < 10 ? month + 1 : month;
  const firstDate = new Date(year, startMonth, dates[0]);
  const lastDate = new Date(year, endMonth, dates[dates.length - 1]);

  return {
    firstDate,
    lastDate,
  };
};

export default getFirstLastDate;
