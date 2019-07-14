import React from "react";

import ComponentDisplayer from "./ComponentDisplayer";

const App = () => {
  const [state, dispatchState] = React.useState(1);

  const incrementState = () => {
    switch (state) {
      case 1:
        dispatchState(2);
        break;
      default:
        dispatchState(1);
    }
  };

  return (
    <>
      <button onClick={incrementState}>Change component</button>
      <ComponentDisplayer componentNumber={state} />
    </>
  );
};

export default App;
