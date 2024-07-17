import React, { useEffect, useState } from "react";
import axios from "axios";
// import amazon from './amazonfull.json'
// import closingfees from './closingfees.json'
// import closingfees1 from './closingfees1.json'
// import closingfees2 from './closingfees2.json'
// import shippingfees from './shippingfees.json'
// import Testing3 from './flipkart/Testing3'

const Testing = (props) => {
  const [amazon, setAmazon] = useState([]);
  const [closingfees, setClosingfees] = useState([]);
  const [closingfees1, setClosingfees1] = useState([]);
  const [closingfees2, setClosingfees2] = useState([]);
  const [shippingfees, setShipingfees] = useState([]);

  useEffect(() => {
    async function fetchData0() {
      try {
        const response = await axios.get("http://localhost:8800/amazondata");
        // console.log("Response:", response.data);
        setAmazon(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    async function fetchData1() {
      try {
        const response = await axios.get(
          "http://localhost:8800/amazonclosingfees"
        );
        // console.log("Response:", response.data);
        setClosingfees(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    async function fetchData2() {
      try {
        const response = await axios.get(
          "http://localhost:8800/amazonclosingfees1"
        );
        // console.log("Response:", response.data);
        setClosingfees1(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    async function fetchData3() {
      try {
        const response = await axios.get(
          "http://localhost:8800/amazonclosingfees2"
        );
        // console.log("Response:", response.data);
        setClosingfees2(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    async function fetchData4() {
      try {
        const response = await axios.get(
          "http://localhost:8800/amazonshippingfees"
        );
        // console.log("Response:", response.data);
        setShipingfees(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchData0();
    fetchData1();
    fetchData2();
    fetchData3();
    fetchData4();
  }, []);
  //   console.log(closingfees1)
  // console.log(props.dropdown)
  let storage = {};
  const animals = [];
  const arr = [];
  const commision = [];
  let Result = [];
  let Discount = [];
  let rto = [];

  const step1 = () => {
    const Q = amazon;
    const W = props.data2;

    for (let i = 0; i < W.length; i++) {
      const Wl = W[i].Category.toLowerCase();
      const El = W[i].gender.toLowerCase();
      const paymentRealized = W[i]["Payment Realized"];
      for (let j = 0; j < Q.length; j++) {
        const Sub = Q[j].Category;
        const Dl = Q[j].Gender.toLowerCase();
        const Ql = Sub.toLowerCase();

        //   if (((W[i].Category== "pyjama") && (W[i].gender=="Kids-Girls")) || ((W[i].Category == "shrug")&&(W[i].gender =="Baby-girls")) || (W[i].Category =="water_dispenser" )){
        //     console.log("match");
        //     //  packages(i,j,paymentRealized,Q)
        //     //  packages1(i,j,paymentRealized,Q)

        //      break;
        //   }else {

        //     // if (((Wl == Ql) &&(El == Dl)) &&  ((W[i].Category !== "pyjama")&&( W[i].gender !=="Kids-Girls")) && ((W[i].Category !=="shrug")&&(W[i].Category!=="Baby-girls")) && (W[i].Category !== "water_dispenser")){

        //   }

        if (Wl == Ql && El == Dl) {
          console.log("match1=");
          packages(i, j, paymentRealized, Q);
          // packages2(i,j,paymentRealized,Q);

          break;
        } else {
          // console.log("not match")
        }
      }
    }
    const updatedData = props.data2.map((item, index) => {
      return { ...item, ASP: Result[index], Discount: Discount[index] };
    });
    props.setData2(updatedData);
  };

  ////////////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  /////////////////////////////////////////////functions//////////////////////////////////////////////////////

  function packages(i, j, paymentRealized, Q) {
    console.log("j", j);
    console.log(Q[j]);
    const a = Q[j];
    // const keyCount = Object.keys(a).length;
    const keyCount = Object.keys(a).filter(
      (key) =>
        typeof a[key] === "number" ||
        (typeof a[key] === "string" && a[key] !== "0")
    ).length;
    console.log(`Number of keys in the object: ${keyCount}`);
    if (keyCount === 6) {
      perfinder6(i, j, paymentRealized, Q);
    } else if (keyCount === 8) {
      perfinder8(i, j, paymentRealized, Q);
    } else if (keyCount === 10) {
      perfinder10(i, j, paymentRealized, Q);
    }
    //  const maximumval = Q[j][">2500"]
    //  let c = (maximumval *100)
    //  let d = (100-c)
    //  const asp1 = (paymentRealized / d) * 100;
    //  const keyName1 = `asp${i}`
    //  storage [keyName1]=asp1;

    //  const keyName2 = `j${i}`;
    //  storage[keyName2]=j;
    // //console.log(storage)
  }

  //////////////////////////percentage finder//////////////////////////////////////////////////
  const perfinder6 = (i, j, paymentRealized, Q) => {
    const maximumval = Q[j]["Referral fee_1"];
    console.log(maximumval);
    let c = maximumval * 100;
    let d = 100 - c;
    const asp1 = (paymentRealized / d) * 100;
    const keyName1 = `asp${i}`;
    storage[keyName1] = asp1;
    const keyName2 = `j${i}`;
    storage[keyName2] = j;
    console.log(storage);

    let ans = storage[keyName1];
    let findji = storage[keyName2];
    const aaa = Q[findji]["Referral fee_1"];
    const bb = Q[findji]["Referral fee"];
    console.log("Referral fee_1", aaa);
    console.log("Referral fee", bb);
    animals.push(aaa, bb);
    for (let i = 0; i < animals.length; i++) {
      const val0 = animals[i] * 100;
      const val1 = 100 - val0;
      const aspc = (paymentRealized / val1) * 100;
      arr.push(aspc);
    }
    let minValue = Math.min(...arr);
    let dd = perFinderfor6(findji, minValue, Q);
    commision.push(dd);
    console.log("minValue", minValue);
    console.log("perFinderfor6", dd);
    // const s = Math.round(newton(paymentRealized,i,commision,j))
    // Result.push(s);
    if (props.dropdown === "volvo") {
      const s = Math.round(
        newton(paymentRealized, i, commision, j, closingfees)
      );
      console.log("newton", s);
      Result.push(s);
    } else if (props.dropdown === "saab") {
      const s = Math.round(
        newton(paymentRealized, i, commision, j, closingfees1)
      );
      console.log("newton", s);
      Result.push(s);
    } else if (props.dropdown === "mercedes") {
      const s = Math.round(
        newton(paymentRealized, i, commision, j, closingfees2)
      );
      console.log("newton", s);
      Result.push(s);
    }

    let a2 = props.data2[i].MRP - Result[i];
    let b2 = Math.round((a2 / props.data2[i].MRP) * 100);
    Discount.push(b2);
  };
  ///////////////
  const perfinder8 = (i, j, paymentRealized, Q) => {
    const maximumval = Q[j]["Referral fee_2"];
    console.log(maximumval);
    let c = maximumval * 100;
    let d = 100 - c;
    const asp1 = (paymentRealized / d) * 100;
    const keyName1 = `asp${i}`;
    storage[keyName1] = asp1;
    const keyName2 = `j${i}`;
    storage[keyName2] = j;
    console.log(storage);

    let ans = storage[keyName1];
    let findji = storage[keyName2];
    const aaa = Q[findji]["Referral fee_1"];
    const bb = Q[findji]["Referral fee"];
    const cc = Q[findji]["Referral fee_2"];

    console.log("Referral fee_1", aaa);
    console.log("Referral fee", bb);
    console.log("Referral fee_2", cc);
    animals.push(aaa, bb, cc);
    for (let i = 0; i < animals.length; i++) {
      const val0 = animals[i] * 100;
      const val1 = 100 - val0;
      const aspc = (paymentRealized / val1) * 100;
      arr.push(aspc);
    }
    let minValue = Math.min(...arr);
    let dd = perFinderfor8(findji, minValue, Q);
    commision.push(dd);
    console.log("minValue", minValue);
    console.log("perFinderfor8", dd);
    // const s = Math.round(newton(paymentRealized,i,commision,j))
    // Result.push(s);
    if (props.dropdown === "volvo") {
      const s = Math.round(
        newton(paymentRealized, i, commision, j, closingfees)
      );
      console.log("newton", s);
      Result.push(s);
    } else if (props.dropdown === "saab") {
      const s = Math.round(
        newton(paymentRealized, i, commision, j, closingfees1)
      );
      console.log("newton", s);
      Result.push(s);
    } else if (props.dropdown === "mercedes") {
      const s = Math.round(
        newton(paymentRealized, i, commision, j, closingfees2)
      );
      console.log("newton", s);
      Result.push(s);
    }

    let a2 = props.data2[i].MRP - Result[i];
    let b2 = Math.round((a2 / props.data2[i].MRP) * 100);
    Discount.push(b2);
  };

  const perfinder10 = (i, j, paymentRealized, Q) => {
    const maximumval = Q[j]["Referral fee_3"];
    console.log(maximumval);
    let c = maximumval * 100;
    let d = 100 - c;
    const asp1 = (paymentRealized / d) * 100;
    const keyName1 = `asp${i}`;
    storage[keyName1] = asp1;
    const keyName2 = `j${i}`;
    storage[keyName2] = j;
    console.log(storage);

    let ans = storage[keyName1];
    let findji = storage[keyName2];
    const aaa = Q[findji]["Referral fee_1"];
    const bb = Q[findji]["Referral fee"];
    const cc = Q[findji]["Referral fee_2"];
    const dddd = Q[findji]["Referral fee_3"];

    console.log("Referral fee_1", aaa);
    console.log("Referral fee", bb);
    console.log("Referral fee_2", cc);
    console.log("Referral fee_3", dddd);

    animals.push(aaa, bb, cc, dddd);
    for (let i = 0; i < animals.length; i++) {
      const val0 = animals[i] * 100;
      const val1 = 100 - val0;
      const aspc = (paymentRealized / val1) * 100;
      arr.push(aspc);
    }
    let minValue = Math.min(...arr);
    let dd = perFinderfor10(findji, minValue, Q);
    commision.push(dd);
    console.log("minValue", minValue);
    console.log("perFinderfor10", dd);
    // const s = Math.round(newton(paymentRealized,i,commision,j))
    // Result.push(s);
    if (props.dropdown === "volvo") {
      const s = Math.round(
        newton(paymentRealized, i, commision, j, closingfees)
      );
      console.log("newton", s);
      Result.push(s);
    } else if (props.dropdown === "saab") {
      const s = Math.round(
        newton(paymentRealized, i, commision, j, closingfees1)
      );
      console.log("newton", s);
      Result.push(s);
    } else if (props.dropdown === "mercedes") {
      const s = Math.round(
        newton(paymentRealized, i, commision, j, closingfees2)
      );
      console.log("newton", s);
      Result.push(s);
    }

    let a2 = props.data2[i].MRP - Result[i];
    let b2 = Math.round((a2 / props.data2[i].MRP) * 100);
    Discount.push(b2);
  };

  //////////////////////////percentage finder 2 ///////////////////////////////////////////
  const perFinderfor6 = (j, min, Q) => {
    const aaa = Q[j]["Referral fee_1"];
    const bb = Q[j]["Referral fee"];

    if (min <= 300 && min >= 0) {
      const a1 = bb;
      return a1;
    }
    if (min > 300) {
      const a1 = aaa;
      return a1;
    }
  };

  const perFinderfor8 = (j, min, Q) => {
    const aaa = Q[j]["Referral fee_1"];
    const bb = Q[j]["Referral fee"];
    const cc = Q[j]["Referral fee_2"];

    if (min <= 300 && min >= 0) {
      const a1 = bb;
      return a1;
    }
    if (min > 300 && min <= 500) {
      const a1 = aaa;
      return a1;
    }
    if (min > 500) {
      const a1 = cc;
      return a1;
    }
  };

  const perFinderfor10 = (j, min, Q) => {
    const aaa = Q[j]["Referral fee_1"];
    const bb = Q[j]["Referral fee"];
    const cc = Q[j]["Referral fee_2"];
    const dddd = Q[j]["Referral fee_3"];

    if (min <= 300 && min >= 0) {
      const a1 = bb;
      return a1;
    }
    if (min > 300 && min <= 500) {
      const a1 = aaa;
      return a1;
    }
    if (min > 500 && min <= 1000) {
      const a1 = cc;
      return a1;
    }
    if (min > 1000) {
      const a1 = dddd;
      return a1;
    }
  };
  /////////////////////////////////////newton raphson//////////////////////////////////////////////////////////////
  // Function to calculate the result based on the given values of C4, C5, C9, C11, and C10
  function newton(paymentRealized, i, commision, j, closingfees) {
    function calculateResult(C4, C5, C6, C9, C11, C10) {
      return C4 - C6 - C9 - C11 - C10;
    }

    // Function to calculate the derivative of the result with respect to C4
    function calculateDerivative(C4, C5, C6, C9, C10, C11) {
      // Central difference method for numerical derivative
      const h = 0.0001; // Step size
      return (
        (calculateResult(C4 + h, C5, C6, C9, C11, C10) -
          calculateResult(C4 - h, C5, C6, C9, C11, C10)) /
        (2 * h)
      );
    }

    // Function to perform Newton-Raphson method to find the value of C4
    function newtonRaphson(C5, C7, C8, initialGuess, tolerance, targetResult) {
      let C4 = initialGuess;
      let result, derivative;

      do {
        // Calculate C6 based on the current C4
        const C6 = C5 * C4;
        // Calculate C9 based on the current C4
        const C9 = gggg(closingfees, j);
        function gggg(Q, j) {
          if (props.dropdown === "volvo") {
            const aaa = Q[j]["Standard Easy Ship"];
            const bb = Q[j]["__EMPTY"];
            const cc = Q[j]["__EMPTY_1"];
            const dd = Q[j]["__EMPTY_2"];

            if (C4 <= 250 && C4 >= 0) {
              const a1 = aaa;
              return a1;
            }
            if (C4 <= 500 && C4 > 250) {
              const a1 = bb;
              return a1;
            }
            if (C4 <= 1000 && C4 > 500) {
              const a1 = cc;
              return a1;
            }
            if (C4 > 1000) {
              const a1 = dd;
              return a1;
            }
          } else if (props.dropdown === "saab") {
            // console.log(Q)
            const aaa = Q[j]["Easy Ship Prime only"];
            const bb = Q[j]["__EMPTY"];
            const cc = Q[j]["__EMPTY_1"];
            const dd = Q[j]["__EMPTY_2"];

            if (C4 <= 250 && C4 >= 0) {
              const a1 = aaa;
              return a1;
            }
            if (C4 <= 500 && C4 > 250) {
              const a1 = bb;
              return a1;
            }
            if (C4 <= 1000 && C4 > 500) {
              const a1 = cc;
              return a1;
            }
            if (C4 > 1000) {
              const a1 = dd;
              return a1;
            }
          } else if (props.dropdown === "mercedes") {
            const aaa = Q[j]["FBA"];
            const bb = Q[j]["__EMPTY"];
            const cc = Q[j]["__EMPTY_1"];
            const dd = Q[j]["__EMPTY_2"];

            if (C4 <= 250 && C4 >= 0) {
              const a1 = aaa;
              return a1;
            }
            if (C4 <= 500 && C4 > 250) {
              const a1 = bb;
              return a1;
            }
            if (C4 <= 1000 && C4 > 500) {
              const a1 = cc;
              return a1;
            }
            if (C4 > 1000) {
              const a1 = dd;
              return a1;
            }
          }
        }

        console.log("closing fees", C9);

        // Calculate C10 based on the current C7 and C8
        const cc = ship();
        function ship() {
          return shippingfees[0]["Natioanl"];
        }
        const C10 = cc / (1 - (C7 + C8));

        console.log(cc);

        // Calculate C11 based on the current C6, C9, and C10
        const C11 = (C6 + C9 + C10) * 0.18;
        result = calculateResult(C4, C5, C6, C9, C11, C10);
        derivative = calculateDerivative(C4, C5, C6, C9, C10, C11);

        C4 -= (result - targetResult) / derivative;
      } while (Math.abs(result - targetResult) > tolerance);

      return C4;
    }

    // Example values for C5, C7, and C8
    const C5 = commision[i]; // Example value for C5
    const C7 = props.data2[i]["Customer Returns"];
    // Example value for C7
    const C8 = props.data2[i].RTO; // Example value for C8
    console.log("commision", C5);
    console.log("RTO", C8);
    console.log("Customer Returns", C7);

    // Initial guess for C4 and tolerance
    const initialGuess = 1;
    const tolerance = 0.1;

    // Target result
    const targetResult = paymentRealized; // Adjust according to your goal

    // Finding the value of C4
    const goalSeekResult = newtonRaphson(
      C5,
      C7,
      C8,
      initialGuess,
      tolerance,
      targetResult
    );

    // Printing the result
    return goalSeekResult;
    // console.log("Goal Seek Result (C4):", goalSeekResult);
  }
  const currentPageUrl = window.location.href;
  // console.log(currentPageUrl)
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      {currentPageUrl == "http://localhost:3000/aspfindereasyship" ? (
        <h1 className="amazon">Amazon - Easy Ship</h1>
      ) : currentPageUrl == "http://localhost:3000/aspfinderprimeonly" ? (
        <h1 className="amazon">Amazon - Prime Only</h1>
      ) : currentPageUrl == "http://localhost:3000/aspfinderfba" ? (
        <h1 className="amazon">Amazon - FBA</h1>
      ) : null}
      <button id="xyz" onClick={step1}>
        Calc ASP
      </button>
    </div>
  );
};

export default Testing;
