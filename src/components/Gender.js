import React from "react";
import { useState } from "react";
import CustomizedButtons from "./Button";

const Gender = ({ name }) => {
  // state created to display API data as an object to cater for the different properties returned from api
  const [genderInfo, setGenderInfo] = useState("");

  //function to obtain data from API
  async function fetchGenderData() {
    try {
      if (name !== "") {
        const res = await fetch(`https://api.genderize.io?name=${name}`);
        const data = await res.json();
        setGenderInfo(JSON.stringify(data.gender)); // setGender will set the state for displaying the API data
        console.log(genderInfo);
      } else {
        alert("Please enter a surname");
      }
    } catch (err) {
      console.log("An error has occurred: " + err.message);
    }
  }

  return (
    <>
      <CustomizedButtons handleClick={fetchGenderData} buttonName="Estimate Gender" />
      <p>Your predicted gender is: {genderInfo}</p>
    </>
  );
};

export default Gender;
