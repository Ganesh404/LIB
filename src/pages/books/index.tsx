import React, { useEffect, useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
 
interface Book {
  id: number;
  ISBN: string;
  name: string;
  author: string;
  genre: string;
  publisheddate: string;
  available: number;
}
const Books: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch('/api/books') // Replace with your API endpoint
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => {
        console.error('There was an error fetching the books!', error);
      });
  }, []);
  const columns: GridColDef[] = [
    { field: "id", headerName: "Id", width: 100 },
    { field: "ISBN", headerName: "ISBN", width: 150 },
    {
      field: "name",
      headerName: "BookTitle",
      cellClassName: "name-column--cell",
      width: 200,
    },
    { field: "author", headerName: "Author", width: 200 },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "publisheddate", headerName: "PublishedDate", width: 150 },
    { field: "available", headerName: "Available copies", width: 150 },
  ];

  const navigate = useNavigate();
  const handleCellClick = (params: { field: string; row: any }) => {
    if (params.field === "name") {
      console.log("contacts");
      navigate(`/eachbook/${params.row.id}`);
    }
  };

  const handleAddBook = () => {
    navigate("/addbook");
  };

  return (
    <Box m="16px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Books" subtitle="Total Books Data" />
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ borderRadius: "7px" }}
          onClick={handleAddBook}
        >
          Add Book
        </Button>
      </Box>
      <Box
        m="8px 0 0 0"
        width="100%"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: `${colors.blueAccent[700]} !important`, // Ensure high specificity

            borderBottom: "none",
            color: colors.grey[100], // Ensure the header text is visible
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          onCellClick={handleCellClick}
        />
      </Box>
    </Box>
  );
};

export default Books;