import React, { useState } from "react";
import { useQuery } from "react-query";
import fetchURL from "./../useQuery/fetchURL";
import BasicFetchTable from "./BasicFetchTable";
import fetchSpecificURL from "./../useQuery/fetchSpecific";

//https://www.balldontlie.io/#getting-started
// https://www.balldontlie.io/api/v1/players
//https://www.balldontlie.io/api/v1/teams
// "https://www.balldontlie.io/api/v1/players?page=2"

const Main = () => {
  const [playersURL, setPlayersURL] = useState(
    "https://www.balldontlie.io/api/v1/players"
  );
  const [teamURL, setTeamURL] = useState(
    "https://www.balldontlie.io/api/v1/teams"
  );
  const [statsURL, setStatsURL] = useState([]);

  const playerList = useQuery(["playersList", `${playersURL}`], fetchURL);
  const statList = useQuery(
    ["playerStats", "https://www.balldontlie.io/api/v1/players", statsURL],
    fetchSpecificURL
  );
  const teamList = useQuery(["teamList", `${teamURL}`], fetchURL);

  return (
    <>
      <header>
        <h1>Basketball API with React-table</h1>
      </header>
      <section className="table_component">
        {playerList.isLoading && <div>Loading</div>}
        {playerList.isError && <div>Uh Oh</div>}
        {playerList.isSuccess && (
          <BasicFetchTable
            dataSet={playerList.data.data}
            setStatsURL={setStatsURL}
            statList={statList.data}
            setPlayersURL={setPlayersURL}
            pagination={playerList.data.meta}
          />
        )}
      </section>
    </>
  );
};

export default Main;
