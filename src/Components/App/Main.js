import React, { useState } from "react";
import { useQuery } from "react-query";
import fetchURL from "./../useQuery/fetchURL";
import BasicTable from './BasicTable';

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
    <BasicTable/>
      {playerList.data && (
        <div className="App-header">
          {playerList.data.data.map((playerPlayer, indexPlayer) => (
            <div key={indexPlayer}>
              Name: {playerPlayer.first_name} {playerPlayer.last_name}
            </div>
          ))}{" "}
        </div>
      )}
    </>
  );
};

export default Main;
