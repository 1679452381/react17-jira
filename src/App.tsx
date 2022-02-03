import React from "react";
import "./App.css";

import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnAuthenticatedApp } from "unauthenticated-app";

function App() {
  const { user } = useAuth();
  return <div>{user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}</div>;
}

export default App;
