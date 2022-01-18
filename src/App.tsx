import React, { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Link, Redirect, Switch } from "react-router-dom";
import Login from "./screens/auth/Login";
import Signup from "./screens/auth/Signup";
import FeedScreen from "./screens/app/FeedScreen";
import ExploreScreen from "./screens/app/ExploreScreen";
import PostScreen from "./screens/app/PostScreen";
import UserScreen from "./screens/app/UserScreen";
import ChatScreen from "./screens/app/ChatScreen";

const App = () => {
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("USER")
  );

  return (
    <ChakraProvider>
      <BrowserRouter>
        {userId ? (
          <Switch>
            <Route path="/home" component={FeedScreen} />
            <Route path="/explore" component={ExploreScreen} />
            <Route path="/post/:id" component={PostScreen} />
            <Route path="/user/:id" component={UserScreen} />
            <Route path="/chat" component={ChatScreen} />
            <Redirect from="*" exact={true} to={userId ? "/home" : "/signup"} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Redirect from="*" exact={true} to={userId ? "/home" : "/signup"} />
          </Switch>
        )}
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
