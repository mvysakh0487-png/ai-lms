import Course from "../models/Course.js";

/**
 * @desc   Create a new course (Instructor only)
 * @route  POST /api/courses
 * @access Instructor
 */
export const createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description required" });
    }

    const course = await Course.create({
      title,
      description,
      instructor: req.user.id,   // 🔥 CRITICAL
      contents: []
    });

    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: "Course creation failed" });
  }
};

/**
 * @desc   Get courses created by logged-in instructor
 * @route  GET /api/courses/instructor
 * @access Instructor
 */
export const getInstructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      instructor: req.user.id
    }).sort({ createdAt: -1 });

    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Failed to load courses" });
  }
};

/**
 * @desc   Upload content (PDF, video, link, text) to a course
 * @route  POST /api/courses/:id/content
 * @access Instructor
 */
export const uploadCourseContent = async (req, res) => {
  try {
    const { type, title, url, text } = req.body;
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // 🔐 Security: only owner instructor
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    course.contents.push({
      type,      // pdf | video | link | text
      title,
      url,
      text,
      uploadedAt: new Date()
    });

    await course.save();

    res.json({
      message: "Content uploaded successfully",
      course
    });
  } catch (err) {
    res.status(500).json({ message: "Content upload failed" });
  }
};

/**
 * @desc   Get all courses (Student)
 * @route  GET /api/courses
 * @access Student
 */
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .select("title description contents")
      .populate("instructor", "name email");

    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};
