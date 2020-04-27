import React, { createRef } from "react";

function FileInput(props) {
  const fileInput = React.createRef()
  function handleSubmit(event) {
    event.preventDefault()
    console.log(`selected file - ${fileInput.current.files[0].name}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Upload audio</label>
      <input type="file" ref={fileInput} />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default FileInput;
