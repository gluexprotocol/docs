export const ProtocolsTable = () => {
  const [protocols, setProtocols] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/gluexprotocol/ecosystem/refs/heads/main/data/protocols.json"
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProtocols(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-600 dark:text-red-400">
          Error loading protocols: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
              Protocol
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
              Description
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
              Category
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
              Chains
            </th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: 8 }).map((_, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-100 dark:border-gray-800 animate-pulse"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-gray-200 dark:bg-gray-700"></div>
                      <div className="w-24 h-4 rounded bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-full h-4 rounded bg-gray-200 dark:bg-gray-700"></div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-16 h-4 rounded bg-gray-200 dark:bg-gray-700"></div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-20 h-4 rounded bg-gray-200 dark:bg-gray-700"></div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-12 h-4 rounded bg-gray-200 dark:bg-gray-700"></div>
                  </td>
                </tr>
              ))
            : protocols.map((protocol) => (
                <tr
                  key={protocol.identifier}
                  className="border-b border-gray-100 dark:border-gray-800 h-min"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://raw.githubusercontent.com/gluexprotocol/ecosystem/main/public${protocol.icon}`}
                        alt={`${protocol.name} logo`}
                        className="w-8 h-8 rounded object-contain flex-shrink-0"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "https://via.placeholder.com/32";
                        }}
                      />
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {protocol.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 max-w-md">
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                      {protocol.description}
                    </p>
                  </td>
                  <td className="px-4">
                    <div className="flex flex-wrap gap-1">
                      {protocol.category.map((cat) => (
                        <span
                          key={cat}
                          className="px-2 py-1 text-xs rounded border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {protocol.chains.slice(0, 3).join(", ")}
                      {protocol.chains.length > 3 && (
                        <span className="text-gray-500 dark:text-gray-500">
                          {" "}
                          +{protocol.chains.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};
