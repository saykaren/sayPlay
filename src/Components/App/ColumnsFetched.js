import { format } from "date-fns";
import ColumnFilter from "./ColumnFilter";

export const COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
    Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "First Name",
    Footer: "First Name",
    accessor: "first_name",
    Filter: ColumnFilter,
  },
  {
    Header: "Last Name",
    Footer: "Last Name",
    accessor: "last_name",
    Filter: ColumnFilter,
  },
  {
    Header: "Position",
    Footer: "Position",
    accessor: "position",
    Filter: ColumnFilter,
  },

];
