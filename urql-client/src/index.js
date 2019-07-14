import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider, createClient } from "urql";

const client = createClient({ url: "http://localhost:4000/graphql" });

ReactDOM.render(
  <Provider value={client}>
    <App/>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
