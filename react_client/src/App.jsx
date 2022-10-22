import React from "react";

import { Provider } from "react-redux";

import store from "./app/store";

import { Footer, Navbar, Section } from "./components";

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Provider store={store}>
          <Section />
        </Provider>
      </div>
      {/* <Footer />  */}
    </div>
  );
};

export default App;
