interface SelectedColumnDataProps {
  step: string;
  columns: Record<string, { value: any; stepName: string }>;
}
export default function SelectedColumnData({
  step,
  columns,
}: SelectedColumnDataProps) {
  const columnNames = Object.keys(columns);
  const stepColumnNames = columnNames.filter(
    (name) => columns[name].stepName === step
  );

  return (
    <div className="flex flex-col items-start gap-1">
      <label htmlFor={step} className="text-xs font-medium text-light-dark">{step}</label>
      <div id={step} className="flex flex-wrap gap-2">
        {stepColumnNames.map((colName) => {
          const value = columns[colName]?.value;
          if (value) {
            return (
              <div
                key={colName}
                className="flex items-center gap-2 border border-light-gray-3 rounded-lg pl-3 p-1"
              >
                <span className="text-sm font-semibold">{colName}</span>
                <span className="text-xs bg-light-gray-2 text-dark-blue font-semibold px-2 py-1 rounded-md">
                  {Array.isArray(value)
                    ? value.length
                    : `${value?.min ?? ""}-${value?.max ?? ""}`}
                </span>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
