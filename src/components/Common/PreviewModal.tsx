import React from "react";
import Modal from "react-modal";
import { PreviewModalProps } from "../../types";

const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onRequestClose,
  data,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>
        CSV Data Preview ({data.length} rows,{" "}
        {data.length > 0 ? Object.keys(data[0]).length : 0} columns)
      </h2>

      <table>
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default PreviewModal;
