import React from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer"
function App() {
  return (
    <div className="App p-4 md:p-8 bg-gray-900 text-white  flex flex-col">
      <Header className="flex-none"/>
      <Body className="flex-grow"/>
      <Footer className="flex-none"/>
    </div>
  );
}

export default App;
