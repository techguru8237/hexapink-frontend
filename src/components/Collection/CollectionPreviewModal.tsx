import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { Collection, Column } from "../../types";
import { formatDate } from "../../utils/formatDate";

interface CollectionPreviewModalProps {
  open: boolean;
  onClose: () => void;
  collection: Collection | null;
}

const CollectionPreviewModal: React.FC<CollectionPreviewModalProps> = ({
  open,
  onClose,
  collection,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Collection Preview</DialogTitle>
      <DialogContent>
        {collection ? (
          <div>
            <Typography variant="h6">{collection.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              Type: {collection.type}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Status: {collection.status}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Created At: {formatDate(collection.createdAt)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Description: {collection.description || "N/A"}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Fee: {collection.fee || 0}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Discount: {collection.discount || 0}
            </Typography>
            <Typography variant="h6" style={{ marginTop: "16px" }}>
              Columns
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={2}>
              {collection.columns.map((column: Column) => (
                <Box
                  key={column.id}
                  sx={{
                    padding: 1,
                    border: "1px solid #e0e0e0",
                    borderRadius: "4px",
                    flexBasis: "calc(50% - 16px)", // Adjust for gap
                    boxSizing: "border-box",
                  }}
                >
                  <Typography variant="subtitle1">{column.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Type: {column.type}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Show to Client: {column.showToClient ? "Yes" : "No"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Additional Fee:{" "}
                    {column.isAdditionalFee
                      ? `$${column.additionalFee}`
                      : "N/A"}
                  </Typography>
                  {column.tableColumns && column.tableColumns.length > 0 && (
                    <Box sx={{ marginTop: 1 }}>
                      <Typography variant="body2" color="textSecondary">
                        Table Columns:
                      </Typography>
                      <ul>
                        {column.tableColumns.map((tableColumn) => (
                          <li key={tableColumn.tableId}>
                            <Typography variant="body2" color="textSecondary">
                              {tableColumn.tableName}: {tableColumn.tableColumn}
                            </Typography>
                          </li>
                        ))}
                      </ul>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </div>
        ) : (
          <Typography variant="body2" color="textSecondary">
            No collection data available.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CollectionPreviewModal;
