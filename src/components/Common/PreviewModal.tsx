import React, { useState } from "react";
import { PreviewModalProps } from "../../types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  TextField,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { IconSearch } from "@tabler/icons-react";

const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onRequestClose,
  data,
}) => {
  const [search, setSearch] = useState<string>(""); // State for search input

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  // Ensure data is not empty and has valid structure before mapping
  const filteredData = data
    .map((item, index) => ({
      id: index + 1, // Generate unique ID starting from 1
      ...item, // Spread the existing item properties
    }))
    .filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase())
      )
    );

  // Check if data has at least one item to define columns
  const columns: GridColDef[] =
    data.length > 0
      ? [
          { field: "id", headerName: "ID", width: 100 }, // New ID column
          ...Object.keys(data[0]).map((key) => ({
            field: key,
            headerName: key.charAt(0).toUpperCase() + key.slice(1),
            width: 150,
          })),
        ]
      : [];

  return (
    <Dialog
      open={isOpen}
      onClose={onRequestClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      maxWidth={"lg"}
    >
      <DialogTitle id="modal-title">CSV Data Preview</DialogTitle>
      <DialogContent>
        <h2>
          ({data.length} rows,{" "}
          {data.length > 0 ? Object.keys(data[0]).length : 0} columns)
        </h2>

        <TextField
          placeholder="Search by any field"
          variant="outlined"
          fullWidth
          size="small"
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <IconSearch style={{ marginRight: 8 }} />,
          }}
        />

        <Paper style={{ height: 500, width: "100%", marginTop: 16 }}>
          <DataGrid
            rows={filteredData}
            columns={columns}
            pageSizeOptions={[10, 20, 50, 100]}
          />
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={onRequestClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PreviewModal;
