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
  uploadSong: function(data) {
    return axios.put("/api/songs", data);
  }
};


