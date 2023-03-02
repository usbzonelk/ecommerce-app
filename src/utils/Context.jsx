import React, { createContext, useState } from 'react'

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [Auth, setAuth] = useState(false)

    return (
        <AuthContext.Provider value={{Auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}