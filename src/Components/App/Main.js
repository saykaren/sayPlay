import React, { useState } from "react";
import { useQuery } from "react-query";
import fetchURL from "./../useQuery/fetchURL";
import BasicTable from './BasicTable';
import SortingTable from './SortingTable';
import GlobalFilter from './GlobalFilter';
import FilteringTable from "./FilteringTable";
import PaginationTable from "./PaginationTable";
import RowSelection from "./RowSelection";
import ColumnOrder from "./ColumnOrder";
import ColumnHiding from "./ColumnHiding";
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
    {/* <ColumnHiding /> */}
    {/* <ColumnOrder/> */}
    {/* <RowSelection /> */}
    {/* <PaginationTable/> */}
    {/* <FilteringTable /> */}
    {/* <SortingTable/> */}
    {playerList.isLoading && <div>Loading</div>}
    {playerList.isError && <div>Uh Oh</div>}
    {playerList.isSuccess && 
    <BasicFetchTable dataSet={playerList.data.data} />}
    {/* <BasicTable /> */}
      {/* {playerList.data && (
        <div className="App-header">
          {playerList.data.data.map((playerPlayer, indexPlayer) => (
            <div key={indexPlayer}>
              Name: {playerPlayer.first_name} {playerPlayer.last_name}
            </div>
          ))}{" "}
        </div>
      )} */}
    </>
  );
};

export default Main;
