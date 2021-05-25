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

const BasicFetchTable = ({ dataSet, setStatsURL, statList }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => dataSet, []);
  const [modal, setModal] = useState(false);

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
    setModal(!modal);
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
        Stat Details
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
            <div>
              {" "}
              {statList.data.map((statData, indexData) => (
                <div key={indexData}>
                  <h2>Player id: {statData.player_id} </h2>
                  <ul>Season: {statData.season} </ul>
                  <ul>Games Played:{statData.games_played}</ul>
                  <ul>Turnover:{statData.turnover}</ul>
                  <ul>Points:{statData.pts}</ul>
                </div>
              ))}
            </div>
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
