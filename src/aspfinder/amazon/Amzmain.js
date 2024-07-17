import React from "react";
import "../../App.css";
import { useEffect } from "react";
import { useState } from "react";
import * as XLSX from "xlsx/xlsx.mjs";
// import template from '../component/template.json'
import Testing from "../amazon/testing";

import template00 from "../../template/template00.json";
// import referenceFlipkart from '../component/referencevalueF.json'
import referenceAmazon from "../../reference_value/referenceValueA.json";
// import TemplateM from '../myntra/TemplateM.json';
// import ReferenceN from '../myntra/ReferenceN.json'
import { useNavigate } from "react-router-dom";
// import Home from '../pages/Home'
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Amzmain = () => {
  const [data2, setData2] = useState([]);
  const [dropdown, setDropdown] = useState("volvo");
  const [test111, setTest111] = useState("fd");
  const [zx, setZx] = useState(true);
  const [logout, setLogout] = React.useState(false);
  const Navigate = useNavigate();
  // useEffect(()=>{
  // if(!localStorage.getItem("auth")) Navigate("/login")
  // },[logout])
  useEffect(() => {
    document.body.classList.add("Amazon-asp");
    return () => {
      document.body.classList.remove("main-body");
      document.body.classList.remove("my-body-class");
      document.body.classList.remove("myntra-forward");
      document.body.classList.remove("Flipkart");
      document.body.classList.remove("Myntra-asp");

    };
  }, [])


  const { theme } = useContext(ThemeContext);

  const handleFileUpload2 = (e) => {
    if (zx == true) {
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
        // console.log(parsedData)
        setData2(parsedData);
      };
    }
    setZx(false);
  };
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data2);
    // console.log(worksheet)
    const workbook = XLSX.utils.book_new();
    // console.log(workbook)

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "sample-file.xlsx");
  };

  /////////templat download ////////////
  const downloadExcel1 = () => {
    const worksheet = XLSX.utils.json_to_sheet(template00);
    // console.log(worksheet)
    const workbook = XLSX.utils.book_new();
    // console.log(workbook)

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "sample-file.xlsx");
  };
  /////////templat download ////////////
  const downloadExcel2 = () => {
    const worksheet = XLSX.utils.json_to_sheet(referenceAmazon);
    // console.log(worksheet)
    const workbook = XLSX.utils.book_new();
    // console.log(workbook)

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "sample-file.xlsx");
  };
  ////////////template download////////////////
  // useEffect(()=>{
  //     console.log(data2)
  //   },[data2])
  // useEffect(()=>{
  //   console.log(dropdown)
  // })

  function df(e) {
    const a = e.target.value;
    setDropdown(a);
  }
  // console.log(dropdown)
  // useEffect(()=>{
  //   if(dropdown==="audi"){
  //     alert("use only flipkart file")

  //   }
  // },[dropdown])

  const logoutHandler = (e) => {
    e.preventDefault();
    // localStorage.removeItem("auth");
    // setLogout(true);
    Navigate("/");
  };

  return (
    <div class="background-wrapper">
       <img
        src="https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="background-imageA"
      ></img>
      <button onClick={logoutHandler} className="btn btn-primary text-left2">
      <span>&#10094;</span>
      </button>
      <div className="app2">
        <input
          type="file"
          accept=".xlsx, .xls"
          className="dcd"
          onChange={(e) => {
            handleFileUpload2(e); // Call the handleFileUpload2 function here
          }}
        />

        {/* <Home setDropdown={setDropdown}/> */}

        <Testing data2={data2} setData2={setData2} dropdown={theme} />
      </div>

      <div className="App">
        <span>
          <button id="xyz" onClick={downloadExcel1}>Download Excel Template</button>
        </span>
        <span>
          <button id="xyz" onClick={downloadExcel2}>Download Reference Name</button>
        </span>
        <span>
          <button id="xyz" onClick={downloadExcel}>Download as Excel</button>
        </span>
      </div>

      {/* <div className="app3">
    {data2.length > 0 && (
      
      <table className="table">
        <thead>
          <tr>
            {Object.keys(data2[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data2.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )}
    </div>
 */}
         {data2.length > 0 && (
        <div className="scroll-container">
          <table>
            <thead>
              <tr>
                {Object.keys(data2[0]).map((key, index) => (
                  <th key={index} className="thA">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data2.map((row, rowIndex) => (
                <tr key={row.id || rowIndex}>
                  {Object.values(row).map((value, valueIndex) => (
                    <td key={valueIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* <Testing1 data2={data2} setData2={setData2}/> */}
    </div>
  );
};

export default Amzmain;
