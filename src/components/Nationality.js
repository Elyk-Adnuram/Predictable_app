import React from "react";
import { useState } from "react";
import CustomizedButtons from "./Button";

const Nationality = ({ name }) => {
  // state created to display API data as an object to cater for the different properties returned from api
  const [nationalityInfo, setNationalityInfo] = useState({
    country_id: "",
    probability: "",
  });

  //function to obtain data from API
  async function fetchNationalityData() {
    try {
      if (name && typeof name === "string" && name.trim().length > 0) {
        const res = await fetch(`https://api.nationalize.io?name=${encodeURIComponent(name)}`);
        const data = await res.json();
        setNationalityInfo(data.country[0]); // setNationality will set the state for displaying the API data
      } else {
        alert("Please enter a valid surname");
      }
    } catch (err) {
      console.log("An error has occurred: " + err.message);
    }
  }

  return (
    <>
      <CustomizedButtons onClick={fetchNationalityData} buttonName="Predict Nationality" />
      <p>Your predicted nationality is: {JSON.stringify(nationalityInfo.country_id)}</p>
      <p>The probability is: {JSON.stringify(nationalityInfo.probability)}</p>
    </>
  );
};

export default Nationality;
