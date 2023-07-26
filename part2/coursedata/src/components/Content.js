import Part from './Part'

const Content = (props) => {
    const parts = props.parts.map((elem) => <Part key={elem.id} part={elem} />)

    const total = props.parts.reduce((sum, elem) => sum + elem.exercises, 0)


    return (
        <div>
            {parts}
            <div >
                <span style={{fontWeight: 'bold'}}>total of {total} exercises</span>
            </div>
        </div>
    )
} 

export default Content