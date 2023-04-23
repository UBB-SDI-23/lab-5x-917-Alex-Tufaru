import { Table, TableCell, TableContainer, TableRow } from "@mui/material";
import { ComicsShowAll } from "../comics/ComicsShowAll";
import { useState } from "react";

export const TableContent = () => {
  const [rowInformation, setRowInformation] = useState([]);
  const [orderDirection, setOrderDirection] = useState("asc");
  const [valueToOrderBy, setValueToOrderBy] = useState("issuesNr");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  fetch("http://127.0.0.1:80/api/comics", {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setRowInformation(data);
    });

  const sortedRowInformation = (rowArray: any[], comparator: any) => {
    const stabilizedRowAway = rowArray.map((el: any, index: any) => [
      el,
      index,
    ]);
    stabilizedRowAway.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedRowAway.map((el) => el[0]);
  };

  function descendingComparator(
    a: any,
    b: { [x: string]: number },
    orderBy: string
  ) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order: string, orderBy: string) {
    return order === "desc"
      ? (a: any, b: any) => descendingComparator(a, b, orderBy)
      : (a: any, b: any) => -descendingComparator(a, b, orderBy);
  }

  const handleRequestSort = (_event: any, property: string) => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? "desc" : "asc");
  };
  return (
    <TableContainer>
      <Table>
        <ComicsShowAll
          valueToOrderBy={valueToOrderBy}
          orderDirection={orderDirection}
          handleRequestSort={handleRequestSort}
        />
        {sortedRowInformation(
          rowInformation,
          getComparator(orderDirection, valueToOrderBy)
        ).map((comic, index) => (
          <TableRow key={index}>
            <TableCell>{comic.issueNr}</TableCell>
          </TableRow>
        ))}
      </Table>
    </TableContainer>
  );
};
