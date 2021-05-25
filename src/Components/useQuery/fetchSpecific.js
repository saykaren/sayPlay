const fetchSpecificURL = async ({ queryKey }) => {
  const [, , specificPlayer] = queryKey;

  if (specificPlayer.length > 0) {
    const url =
      `https://www.balldontlie.io/api/v1/season_averages?season=2018`.concat(
        specificPlayer.map((x) => `&player_ids[]=${x}`).join("")
      );
    const res = await fetch(`${url}`);
    return res.json();
  }
};

export default fetchSpecificURL;
