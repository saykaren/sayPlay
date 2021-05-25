const fetchURL = async ({ queryKey }) => {
  const [, baseURL] = queryKey;

  const res = await fetch(`${baseURL}`);
  return res.json();
};

export default fetchURL;
