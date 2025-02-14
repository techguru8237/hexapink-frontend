interface AddColumnHereButtonProps {
  onClick: () => void;
}

const AddColumnHereButton = ({ onClick }: AddColumnHereButtonProps) => (
  <button
    onClick={onClick}
    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
  >
    Add Column Here
  </button>
);

export default AddColumnHereButton;