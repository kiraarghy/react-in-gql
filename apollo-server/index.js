const { ApolloServer, gql } = require("apollo-server");

const { transformSync } = require("@babel/core");

const fs = require("fs");

const components = fs.readdirSync("./components").reduce(
  (prev, file) => ({
    ...prev,
    [file.split(".")[0]]: {
      componentCode:
        console.log(file.split(".")[0]) ||
        fs.readFileSync(`./components/${file}`, "utf8")
    }
  }),
  {}
);

const typeDefs = gql`
  type Component {
    componentCode: String
  }
  type Query {
    component(componentName: String!): Component
  }
`;

const resolvers = {
  Query: {
    component(obj, args) {
      const untraspiledCode = components[args.componentName].componentCode;

      const transpiledCode = transformSync(untraspiledCode, {
        presets: [require("@babel/preset-env"), require("@babel/preset-react")],
        parserOpts: { allowReturnOutsideFunction: true }
      }).code;

      return { componentCode: transpiledCode };
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
