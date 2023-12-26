import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SiGooglemessages } from "react-icons/si";


const columns = [
  { id: "fullName", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100 },
  {
    id: "mobile",
    label: "Mobile",
    minWidth: 170,
  },
  {
    id: "tokenAmount",
    label: "Token Amount",
    minWidth: 170,

    format: (value) => value.toLocaleString("en-US"),
  },
  { id: "interest", label: "Interest", minWidth: 170 },
  { id: "chat", label: "Chat with User", minWidth: 170 }, // New column
];

export default function EnquiryListing({
  enquiriesLoading,
  enqiuries,
}) {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={'center'}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {enquiriesLoading
              ? Array.from(Array(rowsPerPage), (_, index) => (
                  <TableRow key={index}>
                    {columns.map((column) => (
                      <TableCell key={column.id}>
                        <Skeleton />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : (enqiuries || [])
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((enquiry, index) => (
                    <TableRow
                      key={enquiry?._id?.$oid || index}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                    >
                      {columns.map((column) => {
                        const value = enquiry && enquiry[column.id];

                        // Custom rendering for the "Chat with User" column
                        if (column.id === "chat") {
                          return (
                            <TableCell key={column.id} align={'center'}>
                              <button
                                onClick={() =>
                                  navigate(`/owner/chat/${enquiry.user}`)
                                }
                              >
                                <SiGooglemessages size={32}/>
                              </button>
                            </TableCell>
                          );
                        }

                        return (
                          <TableCell key={column.id} align={'center'}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={(enqiuries || []).length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
