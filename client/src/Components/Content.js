// import React,  from "react";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";

function Content() {
  const location = useLocation();
  console.log(location);
  const [Data, setData] = useState("");
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://gardens-project.onrender.com/api/${location.state.id}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // console.log(data);
      setData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    // alert("here");
    fetchData();
  }, []);
  return (
    <>
      <div>Home</div>
      <div>{Data.scientific_name}</div>
      <div>{Data.common_name}</div>
      <div>{Data.flowering_time}</div>
      <div>{Data.identifying_characters}</div>
      <div>{Data.economic_importance}</div>

      <Box component="div" sx={{ whiteSpace: "normal" }}>
      {Data.scientific_name}
      </Box>
      <Box component="div" sx={{ whiteSpace: "normal" }}>
      {Data.common_name}
      </Box>
      <Box component="div" sx={{ whiteSpace: "normal" }}>
      {Data.flowering_time}
      </Box>
      <Box component="div" sx={{ whiteSpace: "normal" }}>
      {Data.identifying_characters}
      </Box>
      <Box component="div" sx={{ whiteSpace: "normal" }}>
      {Data.economic_importance}
      </Box>
    </>
  );
}
export default Content;
