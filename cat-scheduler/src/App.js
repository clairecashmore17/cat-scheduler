import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import FAQ from "./pages/FAQ";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Create link between graphql from apollo client
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Create authenticating link with token
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// create apollo client link
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/FAQ" element={<FAQ />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
