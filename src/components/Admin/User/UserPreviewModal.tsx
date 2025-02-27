import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import { UserItem } from "../../../types";

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
    { label: "Verified", value: user.is_verified },
    { label: "Created At", value: user.createdAt?.split("T")[0] },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>User Details</DialogTitle>
      <DialogContent>
        <table className="w-full font-raleway">
          <thead>
            <tr>
              <th className="p-2">Key</th>
              <th className="p-2">Value</th>
            </tr>
          </thead>
          <tbody>
            {userDetails.map((detail, index) => (
              <tr key={index}>
                <td className="p-2">
                  {detail.label}
                </td>
                <td className="p-2">
                  {detail.label === "Verified" ? (
                    <span
                      className={`rounded-lg px-2 py-1 text-sm border ${
                        detail.value
                          ? "bg-light-green-2 border-light-green-1 text-green"
                          : "bg-light-red-2 border-light-red-1 text-red"
                      }`}
                    >
                      {detail.value ? "Verified" : "Unverified"}
                    </span>
                  ) : detail.label === "Status" ? (
                    <button
                      className={`rounded-lg px-2 py-1 text-sm ${
                        detail.value === "Active"
                          ? "bg-light-green-2 border-light-green-1 text-green hover:bg-green hover:border-none hover:text-white"
                          : "bg-[#FAFAFA] border-[#E6E6E6] text-dark hover:bg-light-dark hover:border-none hover:text-white"
                      }`}
                    >
                      {detail.value}
                    </button>
                  ) : (
                    detail.value
                  )}
                </td>
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
