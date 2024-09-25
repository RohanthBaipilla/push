// import React, { useState } from 'react';
// import * as XLSX from 'xlsx';

// const Objective1 = () => {
//   const [excelData, setExcelData] = useState([]); // Store Excel data
//   const [rowNumber, setRowNumber] = useState(''); // Store the row number input
//   const [rowLabel, setRowLabel] = useState(''); // Store the label value
//   const [isFileUploaded, setIsFileUploaded] = useState(false); // Track if file is uploaded
//   const [isInputDisabled, setIsInputDisabled] = useState(false); // Track if input is disabled

//   // Handle file upload
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const binaryStr = event.target.result;
//       const workbook = XLSX.read(binaryStr, { type: 'binary' });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//       setExcelData(jsonData); // Store the Excel data
//       setIsFileUploaded(true); // Set the file upload flag to true
//     };

//     reader.readAsBinaryString(file);
//   };

//   // Fetch label value from the specified row
//   const fetchLabel = () => {
//     const row = parseInt(rowNumber); // Convert row number input to an integer

//     // Ensure the row is within the valid range
//     if (row > 0 && row < excelData.length) {
//       // Retrieve the label from the 4th column (index 3)
//       const label = excelData[row][4];
//       setRowLabel(label); // Set the label to be displayed
//       setIsInputDisabled(true); // Disable the input after fetching the label
//     } else {
//       setRowLabel('Invalid Row Number'); // Handle invalid input
//     }
//   };

//   // Reset the row input and clear the label result
//   const resetInput = () => {
//     setRowNumber(''); // Clear the row number input
//     setRowLabel('');  // Clear the displayed label
//     setIsInputDisabled(false); // Enable the input again
//   };

//   return (
//     <div>
//       <h1>Objective 1: Upload Excel and Detect the Malware</h1>
      
//       {/* File upload input */}
//       <input 
//         type="file" 
//         accept=".xlsx, .xls" 
//         onChange={handleFileUpload} 
//       />
      
//       {/* Conditionally render the row number input if the file is uploaded */}
//       {isFileUploaded && (
//         <div>
//           <input 
//             type="number" 
//             value={rowNumber} 
//             onChange={(e) => setRowNumber(e.target.value)} 
//             placeholder="Enter Row Number" 
//             disabled={isInputDisabled} // Disable input based on the state
//           />
//           <button onClick={fetchLabel}>Get Row Label</button>
          
//           {/* Show Reset button only after a valid row has been fetched */}
//           {rowLabel && (
//             <button onClick={resetInput} style={{ marginLeft: '10px' }}>Reset</button>
//           )}
//         </div>
//       )}

//       {/* Display the result */}
//       {rowLabel && <p>Label for Row {rowNumber}: {rowLabel}</p>}
//     </div>
//   );
// };

// export default Objective1;

import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import './Objective1.css';

const Objective1 = () => {
  const [excelData, setExcelData] = useState([]); // Store Excel data
  const [rowNumber, setRowNumber] = useState(''); // Store the row number input
  const [rowLabel, setRowLabel] = useState(''); // Store the label value
  const [isFileUploaded, setIsFileUploaded] = useState(false); // Track if first file is uploaded
  const [isRowNumberDisabled, setIsRowNumberDisabled] = useState(false); // Disable row number input after fetching result
  const [isInput2Visible, setIsInput2Visible] = useState(false); // Track if Input 2 is visible
  const [tableData, setTableData] = useState([]); // Store table data from the second upload
  const [isTableUploaded, setIsTableUploaded] = useState(false); // Track if second file is uploaded

  const fileInputRef = useRef(null); // Reference for file input

  // Handle file upload for the first input
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setExcelData(jsonData); // Store the Excel data
      setIsFileUploaded(true); // Set the file upload flag to true
      setIsRowNumberDisabled(false); // Ensure row number input is enabled after file upload
    };

    reader.readAsBinaryString(file);
  };

  // Handle file upload for the second input (to display in a table)
  const handleTableUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setTableData(jsonData); // Store the table data
      setIsTableUploaded(true); // Set the table upload flag to true
    };

    reader.readAsBinaryString(file);
  };

  // Fetch label value from the specified row
  const fetchLabel = () => {
    const row = parseInt(rowNumber); // Convert row number input to an integer

    // Ensure the row is within the valid range
    if (row > 0 && row < excelData.length) {
      // Retrieve the label from the specified column (index 4)
      const label = excelData[row][4];
      setRowLabel(label); // Set the label to be displayed
      setIsInput2Visible(true); // Show Input 2 when result is available
      setIsRowNumberDisabled(true); // Disable row number input after fetching
    } else {
      setRowLabel('Invalid Row Number'); // Handle invalid input
      setIsInput2Visible(false); // Hide Input 2 if row number is invalid
    }
  };

  // Reset the file input and clear the excel data
  const resetFileInput = () => {
    setRowLabel(''); // Clear label result
    setRowNumber(''); // Clear row number input
    setIsRowNumberDisabled(false); // Enable row number input again
  };

  return (
    <div className="container">
      <h1>Objective 1: Detect the Malware</h1>
      
      {/* First input section */}
      <div className="input-section">
        <h2>Input 1</h2>
        <div>
          <input 
            ref={fileInputRef} // Reference for resetting the file input
            type="file" 
            accept=".xlsx, .xls" 
            onChange={handleFileUpload} 
            className="file-upload"
          />
        </div>
        
        {/* Conditionally render the row number input if the file is uploaded */}
        {isFileUploaded && (
          <div>
            <input 
              type="number" 
              value={rowNumber} 
              onChange={(e) => setRowNumber(e.target.value)} 
              placeholder="Enter Row Number" 
              disabled={isRowNumberDisabled} // Disable after result is fetched
            />
            <button onClick={fetchLabel} disabled={isRowNumberDisabled}>Get Row Label</button>
            <button onClick={resetFileInput}>Reset Row Number</button>
          </div>
        )}

        {/* Display the result for Input 1 */}
        {rowLabel && <p><b>Result 1</b>: Label for Row {rowNumber}: {rowLabel}</p>}
      </div>

      {/* Second input section, displayed only after fetching result from Input 1 */}
      {isInput2Visible && (
        <div className="input-section">
          <h2>Input 2</h2>
          <input 
            type="file" 
            accept=".xlsx, .xls" 
            onChange={handleTableUpload} 
          />

          {/* Display the Excel data in a table format when the second file is uploaded */}
          {isTableUploaded && tableData.length > 0 && (
            <table>
              <thead>
                <tr>
                  {tableData[0]?.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Display result for Input 2 */}
          {isTableUploaded && <p><b>Result 2</b>: Data displayed above.</p>}
        </div>
      )}
    </div>
  );
};

export default Objective1;
