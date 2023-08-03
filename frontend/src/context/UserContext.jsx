import React, { createContext, useEffect, useState } from 'react'

const UserContext = createContext({
  userModel: null,
  setUserModel: () => {},
})

const UserProvider = ({ children }) => {
  const [userModel, setUserModel] = useState(() => {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  })

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(userModel));
  }, [userModel]);

  return (
    <UserContext.Provider value={{ userModel, setUserModel }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider };
export default UserContext;