import React, { useMemo, useState } from "react";
import {
  useTable,
  useGlobalFilter,
  useRowSelect,
  useSortBy,
} from "react-table";
import Checkbox from "./Checkbox";
import { COLUMNS } from "./ColumnsFetched";
import upArrow from "./../Assets/expand_less.png";
import downArrow from "./../Assets/expand_more.png";
import sort from "./../Assets/sort_white.png";
import minimizeIcon from "./../Assets/minimize_white.png";

// "https://www.balldontlie.io/api/v1/players?page=2"

const BasicFetchTable = ({
  dataSet,
  setStatsURL,
  statList,
  setPlayersURL,
  pagination,
}) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => dataSet, []);
  const [modal, setModal] = useState(false);

  const playerPageBaseURL = "https://www.balldontlie.io/api/v1/players?page=";

  console.log({ pagination });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    useRowSelect,

    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selections",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      });
    }
  );

  const activateModal = () => {
    const array = [];
    setModal(true);
    selectedFlatRows
      .map((row) => row.original)
      .map((x) => {
        array.push(x.id);
      });
    setStatsURL(array);
  };

  return (
    <>
      <button
        disabled={selectedFlatRows.length < 1}
        onClick={() => activateModal()}
      >
        2018 Stat Details
      </button>
      {modal && statList && (
        <section className="">
          <div className="modal">
            <img
              src={minimizeIcon}
              alt="minimize"
              onClick={() => setModal(!modal)}
              className="smallIcon floatRight"
            />
            {statList.data.length > 0 ? (
              <div>
                <table id="table">
                  <thead>
                    <tr>
                      <th>Player Id</th>
                      <th>Season</th>
                      <th>Games Played</th>
                      <th>Turnover</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {statList.data.map((statData, indexData) => (
                      <tr key={indexData}>
                        <td>{statData.player_id}</td>
                        <td>{statData.season} </td>
                        <td>{statData.games_played}</td>
                        <td>{statData.turnover}</td>
                        <td>{statData.pts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div>Player has no record for 2018</div>
            )}
          </div>
        </section>
      )}
      <table {...getTableProps()} id="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={`${Math.round(Math.random() * 1000)}${headerGroup.id}`}
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={`${Math.round(Math.random() * 1000)}${column.id}`}
                >
                  {column.render("Header")}
                  <span className="filter_icon">
                    {column.isSorted ? (
                      column.isSorted ? (
                        <img src={downArrow} alt="Down" />
                      ) : (
                        <img src={upArrow} alt="Up" />
                      )
                    ) : (
                      <img src={sort} alt="sort" />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={`${Math.round(Math.random() * 1000)}${row.id}`}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      key={`${Math.round(Math.random() * 1000)}cell${Math.round(
                        Math.random() * 1000
                      )}`}
                    >
                      {" "}
                      {cell.render("Cell")}{" "}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {pagination.current_page} of {pagination.total_pages} |
      <button
        onClick={() =>
          setPlayersURL(`${playerPageBaseURL}${pagination.current_page - 1}`)
        }
        disabled={pagination.current_page < 2}
      >
        {"<<"}
      </button>
      <button
        onClick={() =>
          setPlayersURL(`${playerPageBaseURL}${pagination.next_page}`)
        }
      >
        {">>"}
      </button>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  );
};

export default BasicFetchTable;
