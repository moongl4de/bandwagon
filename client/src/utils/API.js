import axios from "axios";

export default {

  //USER

  getUsers: function() {
    return axios.get("/api/user");
  },
  getUser: function(id) {
    return axios.get("/api/user/" + id);
  },
  deleteUser: function(id) {
    return axios.delete("/api/user/" + id);
  },
  updateUser: function(id, data) {
    return axios.put("/api/user/" + id, data);
  },

    //Artist

    getArtists: function() {
      return axios.get("/api/artist");
    },
    getArtist: function(id) {
      return axios.get("/api/artist/" + id);
    },
    deleteArtist: function(id) {
      return axios.delete("/api/artist/" + id);
    },
    updateArtist: function(id, data) {
      return axios.put("/api/artist/" + id, data);
    },
    createArtist: function(data = {}){
      return axios.post("/api/artist", data)
    },

  //ALBUMS 
  
  createAlbum: function(data = {}){
    return axios.post("/api/albums", data)
  },
  getAlbums: function() {
    return axios.get("/api/albums");
  },
  getAlbum: function(id) {
    return axios.get("/api/albums/" + id);
  },
  // deleteAlbum: function(id) {
  //   return axios.delete("/api/songs/" + id);
  // },
  updateAlbum: function(data) {
    return axios.put("/api/albums", data);
  },

  //SONGS

  uploadSongs: function(data){
    return axios.post("/api/songs", data)
  },
  getSongs: function() {
    return axios.get("/api/songs");
  },
  getSong: function(id) {
    return axios.get("/api/songs/" + id);
  },
  updateSong: function( data) {
    return axios.put("/api/songs",data);
  },
  uploadArt: function(data) {
    return axios.put("/api/songs", data);
  },
  
  
};


