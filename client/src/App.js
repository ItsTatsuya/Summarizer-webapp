import React, { useEffect, useState } from "react";

function App(props) {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  return (
    <div>
      {typeof backendData.users === "undefined" ? (
        <p>Loading...</p>
      ) : (
        backendData.users.map((user, index) => {
          return <p key={index}>{user}</p>;
        })
      )}
    </div>
  );
}

export default App;
