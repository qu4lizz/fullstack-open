import Header from './Header'
import Content from './Content'


const Course = (props) => {
    console.log(props)
    return (
        <div>
            <Header text={props.course.name} />
            <Content key={props.course.id} parts={props.course.parts} />
        </div>
    )
}

export default Course