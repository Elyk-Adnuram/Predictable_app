import "./App.css";
// import Nationality from "./components/Nationality";
// import Age from "./components/Age";
// import Gender from "./components/Gender";
import CustomizedButtons from "./Button";
import { useState, useRef, useEffect } from "react";

function App() {
  const [name, setName] = useState(""); // state created for user input
  const [userInfo, setUserInfo] = useState({
    country_id: "",
    probability: "",
    gender: "",
    age: "",
  });
  const inputRef = useRef(); //useRef initialized
  //useRef hook used to auto-focus on an input field
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  async function fetchData() {
    try {
      if (name && typeof name === "string" && name.trim().length > 0) {
        const res1 = await fetch(`https://api.nationalize.io?name=${encodeURIComponent(name)}`);
        const data1 = await res1.json();
        const res2 = await fetch(`https://api.agify.io?name=${encodeURIComponent(name)}`);
        const data2 = await res2.json();
        const res3 = await fetch(`https://api.genderize.io?name=${encodeURIComponent(name)}`);
        const data3 = await res3.json();
        setUserInfo.country_id(data1.country[0].country_id); // setNationality will set the state for displaying the API data
        setUserInfo.probability(data1.country[0].probability);
        setUserInfo.age(data2.age);
        setUserInfo.gender(data3.gender);
      } else {
        alert("Please enter a valid surname");
      }
    } catch (err) {
      console.log("An error has occurred: " + err.message);
    }
  }

  return (
    <div className="App">
      <h1>Check your predicted Nationality and Estimated Age</h1>
      <input
        ref={inputRef}
        placeholder="Please enter your name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        name={name}
        type="text"
        aria-required
      />
      <br />
      <br />
      {/* <br />
      <Nationality name={name} />
      <Age name={name} />
      <Gender name={name} /> */}
      <CustomizedButtons handleClick={fetchData} buttonName="Predict It All" />

      <p>
        Based on the name "{name}", there is a{Math.round(Number(userInfo.probability) * 100)}{" "}
        percent probability that your nationality is {JSON.stringify(userInfo.country_id)}
        <p>Your predicted gender is: {userInfo.gender}</p>
        <p>Your estimated AGE is: {userInfo.age}</p>
      </p>
    </div>
  );
}

export default App;
