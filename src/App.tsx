import React, { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Login from "./screens/auth/Login";
import Signup from "./screens/auth/Signup";
import FeedScreen from "./screens/app/FeedScreen";
import ExploreScreen from "./screens/app/ExploreScreen";

const App = () => {
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("USER")
  );

  return (
    <ChakraProvider>
      <BrowserRouter>
        {userId ? (
          <>
            <Route path="/home" component={FeedScreen} />
            <Route path="/explore" component={ExploreScreen} />
          </>
        ) : (
          <Link to="/login" />
        )}

        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
