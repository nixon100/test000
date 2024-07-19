import React from "react";
import "../../pages/admin-page/adminPage.css";
import * as XLSX from "xlsx/xlsx.mjs";

const AdminPage = () => {
  const select = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    // console.log(e.target.files)
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      // console.log(workbook)
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
    console.log(parsedData);
    }
  };
  return (
    <div>
      <form action="upload.php" method="POST">
        <input type="file" multiple onChange={(e) => select(e)} />
        <p>Drag your files here or click in this area.</p>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default AdminPage;
