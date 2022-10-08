import React from 'react'
import CourseCard from '../components/CourseCard'

class CourseListPage extends React.Component {
  render() {
    return (
      <div style={{ padding: "8px 4vw" }}>
        <CourseCard
          src="https://img-c.udemycdn.com/course/480x270/1362070_b9a1_2.jpg"
          title="React - The Complete Guide (incl Hooks, React Router, Redux)"
          rating={3.7}
          voters={2023}
          difficulty={3}
          time={64}
          description="Minim id est dolore consectetur proident cupidatat nostrud excepteur do ipsum cupidatat cillum labore fugiat. Minim id adipisicing ut aliquip cupidatat ea laboris occaecat occaecat anim. Id incididunt ut pariatur ad do nulla qui exercitation elit ad laboris. Enim sint aliqua consequat laborum eu ullamco aliquip proident aliquip pariatur ad irure deserunt in. Culpa cillum exercitation ex et nostrud culpa adipisicing dolor. Deserunt ea labore enim qui cillum elit tempor deserunt ut incididunt id quis duis sit."
        />
      </div>
    );
  }
}

export default CourseListPage
