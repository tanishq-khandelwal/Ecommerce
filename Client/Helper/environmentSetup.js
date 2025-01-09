const backendUrl = (type = "graphql") => {
    const LOCAL_URL = "http://localhost:3000/api/v1";
    const GRAPHQL_URL = "https://wanted-halibut-67.hasura.app/v1/graphql";
  
    if (type === "local") {
      return LOCAL_URL;
    } else if (type === "graphql") {
      return GRAPHQL_URL;
    }
    throw new Error("Invalid type. Use 'local' or 'graphql'.");
  };
  
  export default backendUrl;
  