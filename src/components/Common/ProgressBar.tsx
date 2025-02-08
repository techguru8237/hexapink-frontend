const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="w-full h-2 bg-gray-200 rounded">
      <div
        className="h-full bg-dark-blue rounded"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
