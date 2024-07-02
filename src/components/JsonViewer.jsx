 
const JsonViewer = ({ data, name = "root", level = 1 }) => {
  const indent = " ".repeat(level * 4);
  const isArray = Array.isArray(data);

  return (
    <div className="text-black text-left">
      <span>{name}:</span>
      {isArray ? "[" : "{"}
      <ul className="m-0 p-0 pl-2">
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>
            {indent}
            {isArray ? null : <span>{key}: </span>}
            {typeof value === "object" ? (
              <JsonViewer data={value} name={key} level={level + 1} />
            ) : (
              <span>{typeof value === "string" ? `"${value}"` : value}</span>
            )}
          </li>
        ))}
      </ul>
      {indent}
      {isArray ? "]" : "}"}
    </div>
  );
};

export default JsonViewer;