import React from "react";

const UserContext = React.createContext({
  email: '',
  password: '',
  token:'',
  user:{}
});

export default UserContext;
