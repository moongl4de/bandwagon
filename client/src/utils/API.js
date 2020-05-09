import axios from "axios";

export default {
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
  // getSongs: function() {
  //   return axios.get("/api/songs");
  // },
  // getSong: function(id) {
  //   return axios.get("/api/songs/" + id);
  // },
  // deleteSong: function(id) {
  //   return axios.delete("/api/songs/" + id);
  // },
  uploadAlbum: function(data) {
    return axios.post("/api/albums/upload", data);
  }
};


