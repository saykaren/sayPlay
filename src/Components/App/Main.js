import React, { useState } from "react";
import { useQuery } from "react-query";
import fetchURL from "./../useQuery/fetchURL";
import BasicFetchTable from "./BasicFetchTable";

//https://www.balldontlie.io/#getting-started
// https://www.balldontlie.io/api/v1/players
//https://www.balldontlie.io/api/v1/teams

const Main = () => {
  const [playersURL, setPlayersURL] = useState(
    "https://www.balldontlie.io/api/v1/players"
  );
  const [teamURL, setTeamURL] = useState(
    "https://www.balldontlie.io/api/v1/teams"
  );
  const playerList = useQuery(["players", `${playersURL}`], fetchURL);
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
        <BasicFetchTable dataSet={playerList.data.data} />
      )}
      </section>
    </>
  );
};

export default Main;
