export default function CourseCard({ course }) {
  return (
    <div className="card">
      <h4>{course.title}</h4>
      <p>{course.description}</p>
      <p>Progress: {course.progress || 0}%</p>
    </div>
  );
}
