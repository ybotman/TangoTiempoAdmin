async function fetcher(url) {
  const res = await fetch(url);
  return res.json();
}

export default fetcher;
