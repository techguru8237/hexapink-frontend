import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";

import { TagModalProps } from "../../types";
import { addTag, updateTag, deleteTag } from "../../actions/table"; // Import your tag actions

const TagModal = ({
  tableId,
  oldTag,
  open,
  tables,
  setTables,
  handleClose,
  actionType,
}: TagModalProps) => {
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (actionType === "edit" && oldTag) {
      setNewTag(oldTag);
    } else {
      setNewTag("");
    }
  }, [actionType, oldTag]);

  const handleAddEditTag = async () => {
    try {
      if (actionType === "edit") {
        await updateTag(tableId, oldTag, newTag, () => {
          const updatedTables = tables.map((table) => {
            let newTable = table;
            if (table._id == tableId) {
              const tags = table.tags;
              const updatedTags = tags.map((tag) =>
                tag === oldTag ? newTag : tag
              );
              newTable.tags = updatedTags;
            }
            return newTable;
          });
          setTables(updatedTables);
          toast.success("Tag updated successfully.");
          handleClose();
        });
      } else if (actionType === "create") {
        await addTag(tableId, newTag, () => {
          const updatedTables = tables.map((table) => {
            if (table._id === tableId) {
              return { ...table, tags: [...table.tags, newTag] }; // Create a new array with the new tag
            }
            return table; // Return the unchanged table
          });
          setTables(updatedTables);
          toast.success("Tag added successfully.");
          handleClose();
        });
      }
    } catch (error) {
      toast.error("Failed to update/add tag.");
    }
  };

  const handleDeleteTag = async () => {
    try {
      await deleteTag(tableId, oldTag, () => {
        const updatedTables = tables.map((table) => {
          if (table._id === tableId) {
            const updatedTags = table.tags.filter((tag) => tag !== oldTag); // Create a new array excluding the deleted tag
            return { ...table, tags: updatedTags }; // Return a new object with updated tags
          }
          return table; // Return the unchanged table
        });
        setTables(updatedTables);
        toast.success("Tag deleted successfully.");
        handleClose();
      });
    } catch (error) {
      toast.error("Failed to delete tag.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        {actionType === "edit"
          ? "Edit Tag"
          : actionType === "create"
          ? "Add New Tag"
          : "Confirm Delete"}
      </DialogTitle>
      <DialogContent>
        {actionType === "delete" ? (
          <Typography>
            Are you sure you want to delete the tag "{oldTag}"?
          </Typography>
        ) : (
          <>
            <Typography gutterBottom>
              {actionType === "edit"
                ? "Update the tag name below:"
                : "Enter the new tag name:"}
            </Typography>
            <TextField
              label="Tag Name"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              fullWidth
              margin="normal"
              size="small"
              disabled={actionType === "delete"} // Disable input when deleting
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        {actionType === "delete" ? (
          <>
            <Button onClick={handleDeleteTag} color="error">
              Delete
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </>
        ) : (
          <>
            <Button onClick={handleAddEditTag} color="primary">
              {actionType === "edit" ? "Update" : "Add"}
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default TagModal;
