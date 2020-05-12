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
    return axios.post("/api/albums/add", data)
  }


};


