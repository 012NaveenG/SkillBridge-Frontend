import { useState } from 'react';
import * as XLSX from 'xlsx';

const ExportToExcel = ({ data, filename }) => {
    const [exporting, setExporting] = useState(false);

    const handleExport = () => {
        setExporting(true);

        // Define the worksheet data
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Create a new workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Results");

        // Generate a binary string to create the Excel file
        XLSX.writeFile(workbook, `${filename}.xlsx`);

        setExporting(false);
    };

    return (
        <div>
            <button
                onClick={handleExport}
                disabled={exporting}
                className='bg-green-500 hover:bg-TK_Success duration-150 ease-in-out transition-all px-10 py-2 rounded-md text-white mt-5 font-bold'            >
                {exporting ? 'Exporting...' : 'Excel'}
            </button>
        </div>
    );
};

export default ExportToExcel;
