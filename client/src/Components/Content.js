// import React,  from "react";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
      setData(data);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    // alert("here");
    fetchData();
  }, []);

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h5" component="div">
        {Data.scientific_name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          (Scientific Name)
        </Typography>
        <Typography variant="h5" component="div">
        {Data.common_name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          (Common Name)
        </Typography>
        <Typography variant="h5" component="div">
        {Data.flowering_time}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          (Flowering Time)
        </Typography>
        <Typography variant="h5" component="div">
        {Data.identifying_characters}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          (Identifying Characters)
        </Typography>
        <Typography variant="h5" component="div">
        {Data.economic_importance}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          (Economic Importance)
        </Typography>

      </CardContent>
    </React.Fragment>
  );
  return (
    <>
      {/* <div>Home</div> */}
      {/* <div>{Data.scientific_name}</div>
      <div>{Data.common_name}</div>
      <div>{Data.flowering_time}</div>
      <div>{Data.identifying_characters}</div>
      <div>{Data.economic_importance}</div> */}

      {/* <Box component="div" sx={{ whiteSpace: "normal" }}>
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
      </Box> */}
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">{card}</Card>
      </Box>
    </>
  );
}
export default Content;
