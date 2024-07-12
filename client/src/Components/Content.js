// import React,  from "react";
import React,{ useState, useEffect }  from "react";
import { useLocation } from "react-router-dom";

function Content() {
  const location = useLocation();
  console.log(location);
  const [Data, setData] = useState('');
  const fetchData = async () => {
    try {
      const response = await fetch(`https://gardens-project.onrender.com/api/${location.state.id}`, {
        method: 'GET'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setData(data.scientific_name);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  useEffect(() => {
    alert("here");
    fetchData();
  }, []);
  return (
    <>
      <div>Home</div>
      <div>{Data}</div>
    </>
  );
}
export default Content;
