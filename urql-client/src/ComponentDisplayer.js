import React from "react";
import "./App.css";
import { useQuery } from "urql";

const component = `
query component($componentName: String!){
    component(componentName: $componentName) {
        componentCode
      }
}`;

function ComponentDisplayer({ componentNumber }) {
  const [res] = useQuery({
    query: component,
    variables: { componentName: `component${componentNumber}` }
  });

  if (res.fetching) {
    return "Loading...";
  } else if (res.error) {
    console.log(res.error);
    return "Oh no!";
  }

  console.log(res.data);

  var runComponent = new Function("React", res.data.component.componentCode);

  return <div className='main'>{runComponent(React)}</div>;
}

export default ComponentDisplayer;
