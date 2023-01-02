const fetchData = async (url: string, options: any = {}): Promise<any> => {
  const response = await fetch(url, options);
  const json = await response.json();

  return json;
};

export default fetchData;
