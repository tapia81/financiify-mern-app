import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  CircularProgress,
  Typography,
} from "@mui/material";

const columns = [
  { id: "type", label: "Type", minWidth: "18vw" },
  { id: "symbol", label: "Symbol", minWidth: "18vw" },
  { id: "shares", label: "Shares", minWidth: "18vw" },
  { id: "price", label: "Price", minWidth: "18vw" },
  { id: "total", label: "Total", minWidth: "18vw" },
];

export const RecentTransactions = ({
  loaderBox,
  componentContainerStyles,
}) => {
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
      url: `${process.env.REACT_APP_API_URL}/api/transactions`,
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

  const paginationFont = {
    fontSize: { xs: "0.9rem", sm: "1.5rem", lg: "1rem", xl: "1.5rem" },
  };

  return (
    <Paper
      sx={[
        componentContainerStyles,
        {
          flexDirection: { xs: "column", lg: "column" },
          gap: { xs: 0 },
          height: { xs: "100%", sm: "90%", md: "90%", lg: "92%", xl: "92%" },
          minHeight: { xs: "100%", sm: "90%", md: "90%", lg: "92%", xl: "92%" },
        },
      ]}
    >
      <TableContainer
        sx={{
          maxHeight: {
            xs: "80%",
            sm: "100%",
            md: "90%",
            lg: "90%",
            xl: "90%",
          },
          height: {
            xs: "80%",
            sm: "100%",
            md: "90%",
            lg: "90%",
            xl: "100%",
          },
          width: "100%",
          borderBottom: "solid black 0.1vw",
        }}
      >
        {!rows || rows.length < 1 ? (
          <Box sx={loaderBox}>
            <CircularProgress />
          </Box>
        ) : (
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={[
                      {
                        padding: 1,
                        textAlign: "center",
                        maxWidth: column.minWidth,
                        padding: {
                          xs: "2vw",
                          md: "1vw",
                          lg: "1vw",
                          xl: "0.9vw",
                        },
                        fontSize: {
                          sm: "1.3rem",
                          md: "1.2rem",
                          lg: "1.2rem",
                          xl: "1.2rem",
                        },
                        color: "white",
                      },
                    ]}
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
                          const value = row[column.id] ? row[column.id] : null;
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              sx={{
                                maxHeight: "80%",
                                height: "80%",
                                maxWidth: column.minWidth,
                                width: "18vw",
                                textAlign: "center",
                                fontSize: {
                                  xs: "1rem",
                                  sm: "1.39rem",
                                  md: "1rem",
                                  lg: "1rem",
                                  xl: "1.2rem",
                                },
                                padding: {
                                  xs: "3vw",
                                  sm: "2.1vw",
                                  md: "1.3vw",
                                  lg: "1.3vw",
                                  xl: "0.9vw",
                                },
                              }}
                            >
                              <Typography variant="h6">
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </Typography>
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <TablePagination
        sx={[
          paginationFont,
          {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // border: "solid red",
            width: "100%",
            height: {
              xs: "12%",
              sm: "15%",
              md: "15%",
            },
            margin: { xs: "10px", sm: "10px", md: "20px", lg: "0.6vw" },
            paddingTop: { xs: "0px", md: "20px", lg: "0.6vw" },
            "& .MuiTablePagination-selectLabel": paginationFont,
            "& .MuiTablePagination-displayedRows": paginationFont,
            "& .MuiSvgIcon-root": paginationFont,
            "@media (orientation: landscape)": {
              minHeight: {
                xs: "18%",
                md: "8%",
                lg: "10%",
                xl: "8%",
              },
              height: {
                xs: "18%",
                md: "10%",
                lg: "10%",
                xl: "8%",
              },
            },
          },
        ]}
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
