import React, { useState } from "react";
import { useEffect } from "react";
// import fixedfees from "../flipkart/fixedfees.json"
// import collectionfees from "../flipkart/collectionfees.json"
// import shippingfees from "../flipkart/shippingfees.json"
// import reversefees from "../flipkart/reverseshippingfees.json"
// import flipkart from "../flipkart/flipkart.json"
import axios from "axios";
const Testing3 = (props) => {
  console.log(props.data2);
  const [res, setRes] = useState([]);
  const [fiixed_fees, setFixed_fees] = useState([]);
  const [collection_fees, setCollection_fees] = useState([]);
  const [shipping_fees, setShipping_fees] = useState([]);
  const [reverse_fees, setReverse_fees] = useState([]);
  const [flipkart_data, setFlipkart_data] = useState([]);

  useEffect(() => {
    async function fetchData0() {
      try {
        const response = await axios.get("http://localhost:8800/flipfix");
        // console.log("Response:", response.data);
        setFixed_fees(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    async function fetchData1() {
      try {
        const response = await axios.get("http://localhost:8800/flipcoll");
        // console.log("Response:", response.data);
        setCollection_fees(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    async function fetchData2() {
      try {
        const response = await axios.get("http://localhost:8800/flipship");
        // console.log("Response:", response.data);
        setShipping_fees(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    async function fetchData3() {
      try {
        const response = await axios.get("http://localhost:8800/fliprevship");
        // console.log("Response:", response.data);
        setReverse_fees(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    async function fetchData4() {
      try {
        const response = await axios.get("http://localhost:8800/flipdata");
        // console.log("Response:", response.data);
        setFlipkart_data(response.data);
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

  const step1 = () => {
    let storage = {};
    let Result = [];
    const commision = [];
    let Discount = [];
    const animals = [];
    const arr = [];
    const Q = flipkart_data;
    const W = props.data2;
    console.log("test commission",commision)
    console.log("test fixed fees", fiixed_fees)

    for (let i = 0; i < W.length; i++) {
      const Wl = W[i].Category.toLowerCase();
      const El = W[i].gender.toLowerCase();
      console.log("w-category", Wl);

      const paymentRealized = W[i]["Payment Realized"];
      for (let j = 0; j < Q.length; j++) {
        const Sub = Q[j]["Sub-category"];
        const Dl = Q[j].Gender.toLowerCase();
        const Ql = Sub.toLowerCase();

        console.log("q-category", Ql);

        // if ((W[i].Category =="water_dispenser" ) || ((Wl== "pyjama") && (El=="Kids-Girls")) || ((Wl== "shrug") && (El=="Baby-girls"))){

        if (
          (W[i].Category == "pyjama" && W[i].gender == "Kids-Girls") ||
          (W[i].Category == "shrug" && W[i].gender == "Baby-girls") ||
          W[i].Category == "water_dispenser"
        ) {
          console.log("match");
          packages(i, j, paymentRealized, Q);
          packages1(i, j, paymentRealized, Q);

          break;
        } else {
          // if (((Wl == Ql) &&(El == Dl)) &&  ((W[i].Category !== "pyjama")&&( W[i].gender !=="Kids-Girls")) && ((W[i].Category !=="shrug")&&(W[i].Category!=="Baby-girls")) && (W[i].Category !== "water_dispenser")){

          if (Wl == Ql && El == Dl) {
            console.log("match1=");
            packages(i, j, paymentRealized, Q);
            packages2(i, j, paymentRealized, Q);
            break;
          }
        }
      }
    }

    //////////////////////////////////////
    const updatedData = props.data2.map((item, index) => {
      return { ...item, ASP: Result[index], Discount: Discount[index] };
    });
    props.setData2(updatedData);
    //////////////////////////////////////////////

    function packages(i, j, paymentRealized, Q) {
      // //console.log("j", j)
      const maximumval = Q[j][">2500"];
      let c = maximumval * 100;
      let d = 100 - c;
      const asp1 = (paymentRealized / d) * 100;
      const keyName1 = `asp${i}`;
      storage[keyName1] = asp1;

      const keyName2 = `j${i}`;
      storage[keyName2] = j;
      console.log("storage", storage);
    }

    function packages1(i, j, paymentRealized, Q) {
      let find = `asp${i}`;
      let ans = storage[find];

      let findj = `j${i}`;
      let findji = storage[findj];
      const aaa = Q[findji]["0 - 300"];
      const bb = Q[findji]["300 - 500"];
      const cc = Q[findji]["500 - 800"];
      const ddd = Q[findji]["800-1000"];
      const ee = Q[findji]["1000-1500"];
      const ff = Q[findji]["1500-2500"];
      const gg = Q[findji][">2500"];
      const hh = Q[findji].Gender;
      const ii = Q[findji]["Sub-category"];

      animals.push(aaa, bb, cc, ddd);
      for (let i = 0; i < animals.length; i++) {
        const val0 = animals[i] * 100;
        const val1 = 100 - val0;
        const aspc = (paymentRealized / val1) * 100;
        arr.push(aspc);
      }
      let minValue = Math.min(...arr);
      // //console.log("Minimum element is:" + minValue);
      let dd = perFinder1(findji, minValue);
      // //console.log(dd);

      let val0 = dd * 100;
      let z = Math.round((paymentRealized / (100 - val0)) * 100);
      // //console.log("final asp:"+ z)
      commision.push(dd);
      const s = Math.round(newton(paymentRealized, i, commision, j));
      // //console.log(s);
      Result.push(s);
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      let a2 = props.data2[i].MRP - Result[i];
      let b2 = Math.round((a2 / props.data2[i].MRP) * 100);
      Discount.push(b2);

      // else {
      //   const c = storage[`asp${i}`];
      //   const d =  Math.round(c)
      //  // //console.log("above 2500",d)
      //   Result.push(d)
      //   let a2 = (props.data2[i].MRP)-(Result[i])
      //   let b2 = Math.round((a2/props.data2[i].MRP)*100)
      //   Discount.push(b2)

      // }
    }

    function packages2(i, j, paymentRealized, Q) {
      let find = `asp${i}`;

      let findj = `j${i}`;
      let findji = storage[findj];
      const aaa = Q[findji]["0 - 300"];
      const bb = Q[findji]["300 - 500"];
      const cc = Q[findji]["500 - 800"];
      const ddd = Q[findji]["800-1000"];
      const ee = Q[findji]["1000-1500"];
      const ff = Q[findji]["1500-2500"];
      const gg = Q[findji][">2500"];
      const hh = Q[findji].Gender;
      const ii = Q[findji]["Sub-category"];

      animals.push(aaa, bb, cc, ddd, ee, ff, gg);
      for (let i = 0; i < animals.length; i++) {
        const val0 = animals[i] * 100;
        const val1 = 100 - val0;
        const aspc = (paymentRealized / val1) * 100;
        arr.push(aspc);
      }
      let minValue = Math.min(...arr);
      console.log("Minimum element is:" + minValue);
      let dd = perFinder(findji, minValue);
      console.log("perFinder", dd);
      commision.push(dd);

      //   // let val0 = (dd*100);
      //   // let z=  Math.round((paymentRealized/(100-val0))*100)
      //   //// //console.log("final asp:"+ z)
      //   //Result.push(z)

      const s = Math.round(newton(paymentRealized, i, commision, j));
      console.log("newton raphsons", s);
      Result.push(s);
      //   /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      let a2 = props.data2[i].MRP - Result[i];
      let b2 = Math.round((a2 / props.data2[i].MRP) * 100);
      Discount.push(b2);
    }
  };

  const perFinder = (j, min) => {
    const Q = flipkart_data;
    const aaa = Q[j]["0 - 300"];
    const bb = Q[j]["300 - 500"];
    const cc = Q[j]["500 - 800"];
    const ddd = Q[j]["800-1000"];
    const ee = Q[j]["1000-1500"];
    const ff = Q[j]["1500-2500"];
    const gg = Q[j][">2500"];
    // //console.log(gg)
    if (min <= 300 && min >= 0) {
      const a1 = aaa;
      return a1;
    }
    if (min <= 500 && min > 300) {
      const a1 = bb;
      return a1;
    }

    if (min <= 800 && min > 500) {
      const a1 = cc;
      return a1;
    }

    if (min <= 1000 && min > 800) {
      const a1 = ddd;
      return a1;
    }

    if (min <= 1500 && min > 1000) {
      const a1 = ee;
      return a1;
    }
    if (min <= 2500 && min > 1500) {
      const a1 = ff;
      return a1;
    }
    if (min > 2500) {
      const a1 = gg;
      return a1;
    }
  };

  const perFinder1 = (j, min) => {
    const Q = flipkart_data;
    const aaa = Q[j]["0 - 300"];
    const bb = Q[j]["300 - 500"];
    const cc = Q[j]["500 - 800"];
    const ddd = Q[j]["800-1000"];
    const ee = Q[j]["1000-1500"];
    const ff = Q[j]["1500-2500"];

    if (min <= 300 && min >= 0) {
      const a1 = aaa;
      return a1;
    }
    if (min <= 500 && min > 300) {
      const a1 = bb;
      return a1;
    }

    if (min <= 800 && min > 500) {
      const a1 = cc;
      return a1;
    }

    if (min <= 1000 && min > 800) {
      const a1 = ddd;
      return a1;
    }

    if (min <= 1500 && min > 1000) {
      const a1 = ddd;
      return a1;
    }
    if (min <= 2500 && min > 1500) {
      const a1 = ddd;
      return a1;
    }
    if (min > 2500) {
      const a1 = ddd;
      return a1;
    }
  };
  // useEffect(()=>{
  //  // //console.log(res)
  // },[res])

  ///////////////////
  /////////////newton raphion/////////////////////

  function newton(payment, i, commision, j) {
    // Function to calculate the result based on the given values of C6, C8, C10, C11, C12, C13, and C14
    function calculateResult(C6, C8, C10, C11, C12, C13, C14) {
      return C6 - C8 - C10 - C11 - C12 - C13 - C14;
    }

    // Function to calculate the derivative of the result with respect to C6
    function calculateDerivative(C6, C7, C8, C9, C10, C11, C12, C13, C14) {
      // Central difference method for numerical derivative
      const h = 0.0001; // Step size
      return (
        (calculateResult(C6 + h, C8, C10, C11, C12, C13, C14) -
          calculateResult(C6 - h, C8, C10, C11, C12, C13, C14)) /
        (2 * h)
      );
    }

    // Function to perform Newton-Raphson method to find the value of C6
    function newtonRaphson(C7, C9, initialGuess, tolerance, targetResult) {
      let C6 = initialGuess;
      let C8, C10, C11, C12, C13, C14, result, derivative;

      do {
        C8 = C7 * C6;
        C10 = calculateC10(C6, j);
        C11 = calculateC11(C6, C9, j);
        C12 = calculateC12(C6, C9);
        C13 = calculateC13(C9);
        C14 = calculateC14(C6, C9, C7, C8, C10, C11, C12, C13);

        result = calculateResult(C6, C8, C10, C11, C12, C13, C14);
        derivative = calculateDerivative(
          C6,
          C7,
          C8,
          C9,
          C10,
          C11,
          C12,
          C13,
          C14
        );

        C6 -= (result - targetResult) / derivative;
      } while (Math.abs(result - targetResult) > tolerance);

      return C6;
    }

    // Function to calculate C10 based on C6
    function calculateC10(C6, j) {
      const Q = fiixed_fees;
      const aaa = Q[j]["0 - 300"];
      const bb = Q[j]["300 - 500"];
      const cc = Q[j]["500 - 1000"];
      const ddd = Q[j]["> 1000"];

      if (C6 <= 300 && C6 >= 0) {
        const a1 = aaa;
        console.log("C10", a1);

        // //console.log(a1)
        return a1 / (1 - C9);
      }
      if (C6 <= 500 && C6 > 300) {
        const a1 = bb;
        console.log("C10", a1);
        return a1 / (1 - C9);
      }

      if (C6 <= 1000 && C6 > 500) {
        const a1 = cc;
        console.log("C10", a1);
        // console.log("C9",C9)
        // console.log("vaaaaa")
        return a1 / (1 - C9);
        // console.log("vaaaaa",a1/(1-C9))
      }

      if (C6 > 1000) {
        // //console.log("jkdhcjdjksahkjskahk")
        const a1 = ddd;
        console.log("C10", a1);

        return a1 / (1 - C9);
      }
    }

    // Function to calculate C11 based on C6 and C9
    function calculateC11(C6, C9, j) {
      if (C6 <= 750) {
        const v = collection_fees[j].Prepaid;
        console.log("C11", v);
        return v / (1 - C9);
      }
      if (C6 > 750) {
        const v = collection_fees[j].__EMPTY_2;
        console.log("C11", v);
        return (C6 * v) / (1 - C9);
      }
    }

    // Function to calculate C12 based on C6 and C9
    function calculateC12(C6, C9) {
      const s = shipping_fees[0].National;
      console.log("c12",s)
      return s / (1 - C9);
    }

    // Function to calculate C13 based on C9
    function calculateC13(C9) {
      const l = reverse_fees[0].National;
      console.log("c13",l)
      return (l * C9) / (1 - C9);
    }

    // Function to calculate C14 based on C6, C9, C7, and other values
    function calculateC14(C6, C9, C7, C8, C10, C11, C12, C13) {
      return (C8 + C10 + C11 + C12 + C13) * 0.18;
    }

    // Example values for C7 and C9
    const C7 = commision[i]; // Example value for C7
    const C9 = props.data2[i]["Customer Returns"]; // Example value for C9

    // Initial guess for C6 and tolerance
    const initialGuess = 1;
    const tolerance = 0.1;

    // Target result
    const targetResult = payment;

    // Finding the value of C6
    const goalSeekResult = newtonRaphson(
      C7,
      C9,
      initialGuess,
      tolerance,
      targetResult
    );

    // Printing the result
    console.log("Goal Seek Result (C6):", goalSeekResult);
    return goalSeekResult;
  }

  return (
    <div>
      <h1 className="flipkart">Flipkart</h1>
      <button id="xyz" onClick={step1}>
        Calc ASP
      </button>
      {/* <Newton data = {res} state2 = {props.data2} ></Newton> */}
      
    </div>
  );
};

export default Testing3;
