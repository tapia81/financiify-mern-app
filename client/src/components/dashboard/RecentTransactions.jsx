import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "type", label: "Type", minWidth: "18vw" },
  { id: "symbol", label: "symbol", minWidth: "18vw" },
  { id: "shares", label: "Shares", minWidth: "18vw" },
  { id: "price", label: "Price", minWidth: "18vw" },
  { id: "total", label: "Total", minWidth: "18vw" },
];

export const RecentTransactions = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [transactions, setTransactions] = useState([]);

  const fetchAllStocks = async () => {
    const response = await axios({
      url: `${process.env.REACT_APP_LOCAL_URI}/api/transactions`,
      method: "GET",
    }).then((res) => {
      setTransactions(res.data.transactions);
    });

    return response;
  };

  const rows = [...transactions].reverse();

  useEffect(() => {
    fetchAllStocks();
  }, []);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "80vw", height: "80vw" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    maxWidth: column.minWidth,
                    width: "18vw",
                    textAlign: "center",
                    padding: 1,
                    color: "white",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column, key) => {
                      if (row) {
                        const value = row[column.id]
                          ? row[column.id]
                          : "No Column";
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            sx={{
                              maxWidth: column.minWidth,
                              width: "18vw",
                              textAlign: "center",
                            }}
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
