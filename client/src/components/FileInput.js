import React, { createRef } from "react";


function FileInput(props) {
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
      <input type="file" ref={fileInput} />
      </label>
      <br />
      <button type="submit">Upload</button>
    </form>
  );
}

export default FileInput;
