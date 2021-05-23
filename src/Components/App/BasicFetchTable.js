import React, { useMemo } from "react";
import {
  useTable,
  useGlobalFilter,
  useRowSelect,
  useSortBy,
} from "react-table";
import Checkbox from "./Checkbox";
import { COLUMNS } from "./ColumnsFetched";
import GlobalFilter from "./GlobalFilter";
import upArrow from "./../Assets/expand_less.png";
import downArrow from "./../Assets/expand_more.png";
import sort from "./../Assets/sort_white.png";

const BasicFetchTable = ({ dataSet }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => dataSet, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    setGlobalFilter,
    state,
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

  const { globalFilter } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()} id="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={`${Math.round(Math.random()*1000)}${headerGroup.id}`}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} key={`${Math.round(Math.random()*1000)}${column.id}`}>
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
              <tr {...row.getRowProps()} key={`${Math.round(Math.random()*1000)}${row.id}`}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} key={`${Math.round(Math.random()*1000)}cell${Math.round(Math.random()*1000)}`}> {cell.render("Cell")} </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        {/* <tfoot>
          {footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column) => (
                <td {...column.getFooterProps}>{column.render("Footer")}</td>
              ))}
            </tr>
          ))}
        </tfoot> */}
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
