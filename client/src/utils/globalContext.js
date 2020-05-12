import React, { useReducer, createContext, useContext } from "react";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
  return {
    ...state,
    loading: true
  };
    case "SET_CURRENT_ALBUM":
    return {
      ...state,
      currentAlbum: action.album,
      loading: false
    };
    case "ADD_ALBUM":
      return {
        ...state,
        currentAlbum: action.album,
        loading: false
      };
  case "LOAD_ALBUMS":
    return {
      ...state,
      albums: action.albums,
      loading: false
    };
    default:
      return state;
  }
};

// initial state of album object

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    albums: [],
    currentAlbum: {
      _id: 0,
      user: "",
      title: "",
      art: "",
      // release: "",
      songs: [],
      description: "",
    },
    // addedToPlaylist: [],
    loading: false,
  });
  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
