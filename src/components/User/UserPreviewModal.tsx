import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import { UserItem } from "../../types";

interface UserPreviewModalProps {
  open: boolean;
  onClose: () => void;
  user: UserItem | null;
}

const UserPreviewModal: React.FC<UserPreviewModalProps> = ({
  open,
  onClose,
  user,
}) => {
  if (!user) return null;

  // Create an array of user details
  const userDetails = [
    { label: "Full Name", value: `${user.firstName} ${user.lastName}` },
    { label: "Email", value: user.email },
    { label: "Phone", value: user.phone },
    { label: "Country", value: user.country },
    { label: "Industry", value: user.industry },
    { label: "Company", value: user.company },
    { label: "Status", value: user.status },
    { label: "Verified", value: user.verified ? "Yes" : "No" },
    { label: "Created At", value: user.createdAt?.split("T")[0] },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>User Details</DialogTitle>
      <DialogContent>
        <table className="w-full border border-collapse font-raleway">
          <tbody>
            {userDetails.map((detail, index) => (
              <tr key={index}>
                <td className="border border-light-gray-3 p-2">{detail.label}</td>
                <td className="border border-light-gray-3 p-2">{detail.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserPreviewModal;
