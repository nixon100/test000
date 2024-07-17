import React from "react";
// import Details from './Details.json'
// import Commision from './Commision.json'
// import Forward from "./Forward.json";
// import reverse from "./ReverseLOg.json";
import { useState, useEffect } from "react";
import axios from "axios";

const Testing4 = (props) => {
  const [Details, setDetails] = useState([]);
  const [Commision, setCommision] = useState([]);
  const [Forward, setForward] = useState([]);
  const [reverse, setReverse] = useState([]);

  useEffect(() => {
    async function fetchData0() {
      try {
        const response = await axios.get("http://localhost:8800/calmyndetails");
        // console.log("Response:", response.data);
        setDetails(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    async function fetchData1() {
      try {
        const response = await axios.get(
          "http://localhost:8800/calmyncommission"
        );
        // console.log("Response:", response.data);
        setCommision(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    async function fetchData2() {
      try {
        const response = await axios.get("http://localhost:8800/calmynfor");
        // console.log("Response:", response.data);
        setForward(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    async function fetchData3() {
      try {
        const response = await axios.get("http://localhost:8800/mynrev");
        // console.log("Response:", response.data);
        setReverse(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchData0();
    fetchData1();
    fetchData2();
    fetchData3();
  }, []);

  let storage = {};
  let Result = [];
  let Discount = [];
  function step1() {
    console.log("yes");
    const Q = Details;
    const W = props.data2;
    for (let i = 0; i < W.length; i++) {
      const Wl = W[i].Category.toLowerCase();
      const El = W[i].gender.toLowerCase();
      const Bl = W[i].Brand.toLowerCase();
      const paymentRealized = W[i]["Payment Realized"];
      for (let j = 0; j < Q.length; j++) {
        const Sub = Q[j]["Brand"];
        const Dl = Q[j].Gender.toLowerCase();
        const Ql = Sub.toLowerCase(); //brand
        const Fl = Q[j].Article_Type.toLowerCase();

        if (Wl === Fl && El === Dl && Bl === Ql) {
          console.log("match1=", j);
          packages(i, j, paymentRealized, Q);
          packages2(i, j, paymentRealized, Q, Bl);
          break;
        }
      }
    }
    const updatedData = props.data2.map((item, index) => {
      return { ...item, ASP: Result[index], Discount: Discount[index] };
    });
    props.setData2(updatedData);
  }

  ////////////////pakages/////////////////
  function packages(i, j, paymentRealized, Q) {
    // //console.log("j", j)
    const maximumval = Commision[0].Commission;
    let c = maximumval * 100;
    let d = 100 - c;
    const asp1 = (paymentRealized / d) * 100;
    const keyName1 = `asp${i}`;
    storage[keyName1] = asp1;

    const keyName2 = `j${i}`;
    storage[keyName2] = j;
    const keyName3 = "Level";
    storage[keyName3] = Q[j]["Shipping Level"];
    console.log("storage", storage);
  }

  function packages2(i, j, paymentRealized, Q, Bl) {
    // let find = `asp${i}`;

    //     let findj = `j${i}`;
    //     let findji= storage[findj];
    //     const aaa = Q[findji]['0 - 300'];
    //     const bb = Q[findji]['300 - 500'];
    //     const cc = Q[findji]['500 - 800'];
    //     const ddd = Q[findji]['800-1000'];
    //     const ee = Q[findji]['1000-1500'];
    //     const ff = Q[findji]['1500-2500'];
    //     const gg = Q[findji]['>2500'];
    //     const hh = Q[findji].Gender;
    //     const ii = Q[findji]['Sub-category'];

    //     animals.push(aaa,bb,cc,ddd,ee,ff,gg)
    //     for (let i =0; i< animals.length;i++){
    //     const val0 = (animals[i]*100)
    //     const val1 =(100-val0)
    //     const aspc= (paymentRealized/val1)*100
    //     arr.push(aspc)
    //     }
    //     let minValue= Math.min(...arr);
    //     console.log("Minimum element is:" + minValue);
    //     let dd = perFinder(findji,minValue)
    //     console.log("perFinder",dd);
    //     commision.push(dd);

    //   // let val0 = (dd*100);
    //   // let z=  Math.round((paymentRealized/(100-val0))*100)
    //   //// //console.log("final asp:"+ z)
    //   //Result.push(z)
    if (Bl === "Kryptic") {
      const comm = Commision[0].Commission;
      const s = Math.round(newton(paymentRealized, i, comm, j));
      console.log("newton raphsons Kryptic", s);
      Result.push(s);
    } else {
      const comm1 = Commision[1].Commission;
      const s = Math.round(newton(paymentRealized, i, comm1, j));
      console.log("newton raphsons", s);
      Result.push(s);
    }

    let a2 = props.data2[i].MRP - Result[i];
    let b2 = Math.round((a2 / props.data2[i].MRP) * 100);
    Discount.push(b2);
  }

  //////////newton raphson////////////////////
  // function newton (payment,i,commision,j){
  //     // Function to calculate the result based on the given values of C6, C8, C10, C11, C12, C13, and C14
  //     function calculateResult(C6, C8, C10, C11, C12, C13, C14) {
  //       return C6 - C8 - C10 - C11 - C12 - C13 - C14;
  //     }

  //     // Function to calculate the derivative of the result with respect to C6
  //     function calculateDerivative(C6, C7, C8, C9, C10, C11, C12, C13, C14) {
  //       // Central difference method for numerical derivative
  //       const h = 0.0001; // Step size
  //       return (calculateResult(C6 + h, C8, C10, C11, C12, C13, C14) - calculateResult(C6 - h, C8, C10, C11, C12, C13, C14)) / (2 * h);
  //     }

  //     // Function to perform Newton-Raphson method to find the value of C6
  //     function newtonRaphson(C7, C9, initialGuess, tolerance, targetResult) {
  //       let C6 = initialGuess;
  //       let C8, C10, C11, C12, C13, C14, result, derivative;

  //       do {
  //           C8 = C7 * C6;
  //           C10 = calculateC10(C6,j);
  //           C11 = calculateC11(C6, C9,j);
  //           C12 = calculateC12(C6, C9);
  //           C13 = calculateC13(C9);
  //           C14 = calculateC14(C6, C9, C7, C8, C10, C11, C12, C13);

  //           result = calculateResult(C6, C8, C10, C11, C12, C13, C14);
  //           derivative = calculateDerivative(C6, C7, C8, C9, C10, C11, C12, C13, C14);

  //           C6 -= (result - targetResult) / derivative;
  //       } while (Math.abs(result - targetResult) > tolerance);

  //       return C6;
  //     }

  //     // Function to calculate C10 based on C6
  //     function calculateC10(C6,j) {
  //       const Q =fixedfees ;
  //       const aaa = Q[j]["0 - 300"];
  //         const bb = Q[j]["300 - 500"];
  //         const cc = Q[j]["500 - 1000"];
  //         const ddd = Q[j]["> 1000"];

  //     if (C6 <= 300 && C6 >= 0) {

  //           const a1 = aaa;
  //           console.log("a1", a1)

  //           // //console.log(a1)
  //           return a1/(1-C9)
  //         }
  //       if (C6 <= 500 && C6 > 300) {

  //         const a1 = bb;
  //         console.log("a1", a1)
  //         return a1/(1-C9)  }

  //       if (C6 <= 1000 && C6 > 500) {
  //         const a1 = cc;
  //         console.log("a1", a1)
  //         // console.log("C9",C9)
  //         // console.log("vaaaaa")
  //         return a1/(1-C9)
  //         // console.log("vaaaaa",a1/(1-C9))
  //       }

  //       if (C6 > 1000) {
  //         // //console.log("jkdhcjdjksahkjskahk")
  //         const a1 =ddd;
  //         console.log("a1", a1)

  //         return a1/(1-C9)  }
  //     }

  //     // Function to calculate C11 based on C6 and C9
  //     function calculateC11(C6, C9,j) {
  //       if (C6 <= 750) {
  //         const v= collectionfees[j].Prepaid;
  //         console.log("v",v)
  //         return  v/(1-C9)
  //       }
  //       if (C6 > 750) {
  //         const v = collectionfees[j].__EMPTY_2;
  //         console.log("v",v)
  //         return  (C6 * v) / (1 - C9)
  //       }
  //     }

  //     // Function to calculate C12 based on C6 and C9
  //     function calculateC12(C6, C9) {
  //       const s= shippingfees[0].National
  //       return s / (1 - C9);
  //     }

  //     // Function to calculate C13 based on C9
  //     function calculateC13(C9) {
  //       const l = reversefees[0].National
  //       return l * C9 / (1 - C9);
  //     }

  //     // Function to calculate C14 based on C6, C9, C7, and other values
  //     function calculateC14(C6, C9, C7, C8, C10, C11, C12, C13) {
  //       return (C8 + C10 + C11 + C12 + C13) * 0.18;
  //     }

  //     // Example values for C7 and C9
  //     const C7 = commision; // Example value for C7
  //     const C9 = props.data2[i]["Customer Returns"]; // Example value for C9

  //     // Initial guess for C6 and tolerance
  //     const initialGuess = 1;
  //     const tolerance = 0.1;

  //     // Target result
  //     const targetResult = payment;

  //     // Finding the value of C6
  //     const goalSeekResult = newtonRaphson(C7, C9, initialGuess, tolerance, targetResult);

  //     // Printing the result
  //     console.log("Goal Seek Result (C6):", goalSeekResult);
  //     return goalSeekResult

  //     }

  function newton(payment, i, commision, j) {
    console.log("parameter" ,  payment,i,commision,j)
    function calculateResult(B4, B5, B6, B7) {
      // Calculate B8 based on B4
      const B8 =
        B4 > 1500 ? 43 : B4 > 1000 ? 42 : B4 > 750 ? 19 : B4 > 500 ? 15 : 7;
      console.log("b8", B8);

      // Calculate B9, B10, B11 based on B4 and B7
      const B9 = (B4 * 0.02) / (1 - B7);
      console.log("b9", B9);

      const BB10 = () => {
        if (storage.Level === "1") {
          const as = Forward[0].__EMPTY_2;
          return as / (1 - B7);
        } else if (storage.Level === "2") {
          const as = Forward[1].__EMPTY_2;
          return as / (1 - B7);
        } else if (storage.Level === "3") {
          const as = Forward[2].__EMPTY_2;
          return as / (1 - B7);
        } else if (storage.Level === "4") {
          const as = Forward[3].__EMPTY_2;
          return as / (1 - B7);
        } else if (storage.Level === "5") {
          const as = Forward[4].__EMPTY_2;
          return as / (1 - B7);
        }
      };
      const B10 = BB10();

      console.log("b10", B10);

      const BB11 = () => {
        if (storage.Level === "1") {
          const as = reverse[0].__EMPTY_2;
          return (as * B7) / (1 - B7);
        } else if (storage.Level === "2") {
          const as = reverse[1].__EMPTY_2;
          return (as * B7) / (1 - B7);
        } else if (storage.Level === "3") {
          const as = reverse[2].__EMPTY_2;
          return (as * B7) / (1 - B7);
        } else if (storage.Level === "4") {
          const as = reverse[3].__EMPTY_2;
          return (as * B7) / (1 - B7);
        } else if (storage.Level === "5") {
          const as = reverse[4].__EMPTY_2;
          return (as * B7) / (1 - B7);
        }
      };
      const B11 = BB11();
      console.log("b11", B11);

      // Calculate B12 based on B6, B8, B9, B10, B11
      const B12 = (B6 + B8 + B9 + B10 + B11) * 0.18;

      // Calculate the result
      return B4 - B4 * B5 - B8 - B9 - B10 - B11 - B12;
    }

    // Function to calculate the derivative of the result with respect to B4
    function calculateDerivative(B4, B5, B6, B7) {
      const h = 0.0001; // Step size
      return (
        (calculateResult(B4 + h, B5, B6, B7) -
          calculateResult(B4 - h, B5, B6, B7)) /
        (2 * h)
      );
    }

    // Function to perform Newton-Raphson method to find the value of B4
    function newtonRaphson(B5, B6, B7, initialGuess, tolerance, targetResult) {
      let B4 = initialGuess;
      let result, derivative;

      do {
        // Calculate B6 based on B4
        const B6 = B5 * B4;

        // Calculate the result and derivative
        result = calculateResult(B4, B5, B6, B7);
        derivative = calculateDerivative(B4, B5, B6, B7);

        // Update B4 using Newton-Raphson method
        B4 -= (result - targetResult) / derivative;
      } while (Math.abs(result - targetResult) > tolerance);

      return B4;
    }

    // Example values for B5 and B7
    const B5 = commision; // Example value for B5
    const B7 = props.data2[i]["Customer Returns"]; // Example value for B7
    console.log("commision", B5);
    console.log("customer returns", B7);

    // Initial guess for B4 and tolerance
    const initialGuess = 1;
    const tolerance = 0.0001;

    // Target result
    const targetResult = payment; // Adjust according to your goal
    console.log("payment", targetResult);

    // Finding the value of B4 using Newton-Raphson method
    const goalSeekResult = newtonRaphson(
      B5,
      B5 * initialGuess,
      B7,
      initialGuess,
      tolerance,
      targetResult
    );
    return goalSeekResult;
    // Printing the result
    // console.log("Goal Seek Result (B4):", goalSeekResult);
  }
  return (
    <div>
      <h1 className="myntra">Myntra</h1>

      <button id="xyz" onClick={step1}>
        Calc ASP
      </button>
      {/* <Newton data = {res} state2 = {props.data2} ></Newton> */}
    </div>
  );
};
export default Testing4;
