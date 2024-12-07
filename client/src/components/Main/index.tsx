import "./module.css";

import { useState } from "react";

const Main = () => {
  const [description, setDescription] = useState("old description");

  const changeDescription = () => {
    setDescription("New description");
  };

  return (
    <div className='main'>
      <h1>Main</h1>
      <div className='content'>
        <p className='description'>{description}</p>
        <button onClick={changeDescription}>Change description</button>
      </div>
    </div>
  );
};

export default Main;
