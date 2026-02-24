import { useState } from "react";
import API from "../../services/api";

export default function UploadContent() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("pdf");
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", title);
    form.append("type", type);

    if (type === "link") {
      form.append("link", link);
    } else {
      form.append("file", file);
    }

    try {
      await API.post("/content/upload", form, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Content uploaded successfully");
      setTitle("");
      setFile(null);
      setLink("");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <form onSubmit={submit} className="card">
      <h2>Upload Content</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="pdf">PDF</option>
        <option value="video">Video</option>
        <option value="text">Text</option>
        <option value="link">Link</option>
      </select>

      {type === "link" ? (
        <input
          placeholder="Paste link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      ) : (
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      )}

      <button className="btn btn-primary">Upload</button>
    </form>
  );
}
