import * as React from "react";
import { useLocation } from "react-router-dom";

function Content() {
    const location = useLocation();
    console.log(location);
    console.log('here');
    // alert('here');
  return (
    <>
    <div>Home</div>
    <div>{location.state.id}</div>
    </>
  );
}
export default Content;
