import axios from "axios";

export default {
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


