import React, { useReducer, createContext, useContext } from "react";
// Don't forget to import all of your actions!

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_ALBUM':
    return {
      ...state,
      currentAlbum: action.post,
      loading: false
    };
    case "ADD_ALBUM":
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    albums: [],
    currentAlbum: {
      _id: 0,
      user: "",
      title: "",
      art: "",
      release: "",
      status: "",
      songs: [],
      description: "",
    },
    // favorites: [],
    loading: false,
  });
  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
