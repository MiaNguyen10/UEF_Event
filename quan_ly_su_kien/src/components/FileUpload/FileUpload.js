import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    try {
      const res = await axios.post("/api/upload",
        formData
      );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div>
      <label for="eventImage">Chọn hình ảnh</label>
      <input
        name="image"
        type="file"
        accept="image/*"
        class="form-control-file"
        id="eventImage"
        multiple
        onChange={saveFile}
      />
      <br />
      <div class="card-footer text-right">
        <button onClick={uploadFile}>Đăng sự kiện</button>
      </div>
    </div>
  );
};

export default FileUpload;
