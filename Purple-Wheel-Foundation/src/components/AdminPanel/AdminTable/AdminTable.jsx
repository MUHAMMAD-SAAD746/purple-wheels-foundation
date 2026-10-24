import "./AdminTable.css";

const AdminTable = ({ columns, data, emptyMessage = "No records found." }) => {
    return (
        <div className="admin-table-wrapper">
            <table className="admin-table">
                <thead className="admin-table-head">
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} className="admin-table-th">
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="admin-table-body">
                    {data.length === 0 ? (
                        <tr>
                            <td className="admin-table-empty" colSpan={columns.length}>
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((row, rowIndex) => (
                            <tr key={row.id || rowIndex} className="admin-table-row">
                                {columns.map((col) => (
                                    <td key={col.key} className="admin-table-td">
                                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminTable;
