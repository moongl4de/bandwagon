import React, {
    useReducer,
    createContext,
    useContext
} from "react";
// Don't forget to import all of your actions!

const StoreContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT_USER':
            return {
                ...state,
                user: {}
            }
        default:
            return state;
    }
};

const initialState = {
    user: {
        // email:"test@test.com",
        // password: "123123"
    }
}

const StoreProvider = ({...props}) => {
    return <StoreContext.Provider value={useReducer(reducer, initialState)} {...props}  />;
};

const useStoreContext = () => useContext(StoreContext);

export {
    StoreProvider,
    useStoreContext
};