import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Button,
  Autocomplete,
  createFilterOptions,
} from "@mui/material";
import { toast } from "react-toastify";

import { TagModalProps } from "../../types";
import { addTag, updateTag, deleteTag } from "../../actions/table"; // Import your tag actions
import api from "../../actions/api";

interface TagOption {
  inputValue?: string;
  name: string;
}

const filter = createFilterOptions<TagOption>();

const TagModal = ({
  tableId,
  oldTag,
  open,
  tables,
  setTables,
  handleClose,
  actionType,
}: TagModalProps) => {
  const [tags, setTags] = useState<TagOption[]>([]);
  const [newTag, setNewTag] = useState<TagOption | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await api.get("/api/tag");
        console.log("response.data", response.data);
        setTags(response.data);
      } catch (error: any) {
        console.log(
          "error.data.response.message",
          error.data?.response?.message || error.message
        );
      }
    };

    if (open) {
      fetchTags();
    }
  }, [open]); // Fetch tags only when the modal opens

  useEffect(() => {
    if (actionType === "edit" && oldTag) {
      setNewTag({ name: oldTag });
    }
  }, [actionType, oldTag]);

  const handleAddEditTag = async () => {
    try {
      if (actionType === "edit") {
        await updateTag(tableId, oldTag, newTag?.name || "", () => {
          const updatedTables = tables.map((table) => {
            if (table._id === tableId) {
              const updatedTags = table.tags.map((tag) =>
                tag === oldTag ? newTag?.name : tag
              );
              return { ...table, tags: updatedTags };
            }
            return table;
          });
          setTables(updatedTables);
          toast.success("Tag updated successfully.");
          handleClose();
        });
      } else if (actionType === "create") {
        await addTag(tableId, newTag?.name || "", () => {
          const updatedTables = tables.map((table) => {
            if (table._id === tableId) {
              return { ...table, tags: [...table.tags, newTag?.name] };
            }
            return table;
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
            const updatedTags = table.tags.filter((tag) => tag !== oldTag);
            return { ...table, tags: updatedTags };
          }
          return table;
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
          <div className="flex flex-col gap-1">
            <Typography gutterBottom>
              {actionType === "edit"
                ? "Update the tag name below:"
                : "Enter the new tag name:"}
            </Typography>

            <Autocomplete
              value={newTag}
              onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                  setNewTag({ name: newValue });
                } else if (newValue && newValue.inputValue) {
                  setNewTag({ name: newValue.inputValue });
                } else {
                  setNewTag(newValue);
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;
                const isExisting = options.some(
                  (option) => inputValue === option.name
                );
                if (inputValue !== "" && !isExisting) {
                  filtered.push({
                    inputValue,
                    name: `Add "${inputValue}"`,
                  });
                }
                return filtered;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              id="free-solo-with-text-demo"
              options={tags}
              autoFocus
              size="small"
              getOptionLabel={(option) => {
                if (typeof option === "string") {
                  return option;
                }
                if (option.inputValue) {
                  return option.inputValue;
                }
                return option.name;
              }}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  <li key={key} {...optionProps}>
                    {option.name}
                  </li>
                );
              }}
              sx={{ width: 300 }}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="Input tag name" />
              )}
            />
          </div>
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
