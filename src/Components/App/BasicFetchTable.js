import React, { useMemo } from "react";
import { useTable, useGlobalFilter, useRowSelect } from "react-table";
import Checkbox from "./Checkbox";
import { COLUMNS } from "./ColumnsFetched";
import GlobalFilter from "./GlobalFilter";

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
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}> {cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column) => (
                <td {...column.getFooterProps}>{column.render("Footer")}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <pre>
          <code>
              {JSON.stringify(
                  {
                      selectedFlatRows: selectedFlatRows.map((row)=> row.original),
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
