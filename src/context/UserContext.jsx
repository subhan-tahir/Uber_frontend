import React, { createContext, useEffect, useState } from 'react'

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
    const [user, setUser] = useState({
        email: '',
        id: '',
        password: '',
        fullName: {
            firstName: '',
            lastName: '',
        }
    });
    

    return (
        <div>
            <UserDataContext.Provider value={{ user, setUser }}>
                {children}
            </UserDataContext.Provider>
        </div>
    );
}

export default UserContext;
