import * as React from "react";
import { useAuthentication } from "@utils/useAuthentication";
import AuthStack from "@navigation/authStack";
import UserTab from "@navigation/userTab";

export default function App() {
  const { user } = useAuthentication();

  return user ? <UserTab /> : <AuthStack />;
}
