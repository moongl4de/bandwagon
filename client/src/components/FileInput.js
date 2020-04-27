import React, { createRef } from "react";

function FileInput(props) {
  const fileInput = React.createRef()
  function handleSubmit(event) {
    event.preventDefault()
    console.log(`selected file - ${fileInput.current.files[0].name}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Upload audio
      <input type="file" ref={fileInput} />
      </label>
      <br />
      <button type="submit">Upload</button>
    </form>
  );
}

export default FileInput;
