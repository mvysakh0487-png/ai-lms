import { useState } from "react";
import API from "../../services/api";

export default function UploadMaterial({ courseId }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("pdf");

  const upload = async () => {
    const form = new FormData();
    form.append("file", file);
    form.append("courseId", courseId);
    form.append("title", title);
    form.append("type", type);

    await API.post("/courses/upload", form);
    alert("Uploaded");
  };

  return (
    <div>
      <input placeholder="Material Title"
        onChange={e => setTitle(e.target.value)} />

      <select onChange={e => setType(e.target.value)}>
        <option value="pdf">PDF</option>
        <option value="video">Video</option>
      </select>

      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload</button>
    </div>
  );
}
