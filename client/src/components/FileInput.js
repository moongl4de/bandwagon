import React, { createRef } from "react";
import songsAPI from "../utils/songsAPI"
import { useStoreContext } from "../utils/globalContext";

function FileInput(props) {
  // const [global, dispatch] = useStoreContext();
  // let userEmail = global.user.email;

  const fileInput = React.createRef()
  const handleFileUpload = props.handleFileUpload

  function handleSubmit(event) {
    event.preventDefault()
    const file = fileInput.current.files[0]
    console.log(`selected file - ${file.name}`);
    handleFileUpload(file)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Upload audio
      <input type="file" ref={fileInput} multiple/>
      </label>
      <br />
      <button type="submit">Upload</button>
    </form>
  );
}

export default FileInput;

// import React, { createRef } from "react";
// import songsAPI from "../utils/songsAPI"
// import { useStoreContext } from "../utils/globalContext";
// import axios from "axios";

// function FileInput(props) {
//   // const [global, dispatch] = useStoreContext();
//   // let userEmail = global.user.email;

//   // let state = {songs:[]}

//   const fileInput = React.createRef()
//   // const handleFileUpload = props.handleFileUpload



//     const handleFileUpload = (file) => {
//     if (!file) {
//       return;
//     }
//     axios
//   .put('/api/songs', file.name )
//   .then(res => console.log(res))
//   .catch(err => console.log(err.message));
//     // let uploadPromises = file.map(song => {
//     //   console.log(song)
//     //   let data = new FormData()
//     //   data.append('/api/songs', song, song.url)
//     //   return axios.post()
//   }
  

//   function handleSubmit(event) {
//     event.preventDefault()
//     const file = fileInput.current.files[0]
//     console.log(file);
//     handleFileUpload(file)
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>Upload audio
//       <input type="file" ref={fileInput} multiple/>
//       </label>
//       <br />
//       <button type="submit">Upload</button>
//     </form>
//   );
// }

// export default FileInput;

