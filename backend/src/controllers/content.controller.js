import Content from "../models/Content.js";

/* UPLOAD */
export const uploadContent = async (req, res) => {
  try {
    const { title, type, link } = req.body;

    let url = link || "";

    if (req.file) {
      url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const content = await Content.create({
      title,
      type,
      url,
      instructor: req.user._id
    });

    res.json({ message: "Uploaded", content });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ message: "Upload failed" });
  }
};

/* INSTRUCTOR */
export const getInstructorContent = async (req, res) => {
  const content = await Content.find({
    instructor: req.user._id
  }).sort({ createdAt: -1 });

  res.json(content);
};

/* STUDENT */
export const getStudentContent = async (req, res) => {
  const content = await Content.find()
    .populate("instructor", "name")
    .sort({ createdAt: -1 });

  res.json(content);
};
