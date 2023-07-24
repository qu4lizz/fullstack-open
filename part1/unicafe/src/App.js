import { useState } from 'react'

const Header = (props) => (
  <div>
    <h1>
    {props.text}
    </h1>
  </div>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

const Statistics = (props) => {
  if (props.totalVotes !== 0) {
    return (
      <table>
        <tbody>
        <StatisticLine text='good' value={props.good} />
        <StatisticLine text='neutral' value={props.neutral} />
        <StatisticLine text='bad' value={props.bad} />
        <StatisticLine text='all' value={props.totalVotes} />
        <StatisticLine text='average' value={props.average} />
        <StatisticLine text='positive' value={props.positivePercentage} />
        </tbody>
      </table>
    )
  }
  return (
    <div>
      No feedback given
    </div>
  )
}

const App = () => {
  const headerText = 'give feedback'
  const statsText = 'statistics'


  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const totalVotes = good + neutral + bad;
  const average = (good - bad) / totalVotes;
  const positivePercentage = (good / totalVotes) * 100;

  const setGoodValue = newValue => {
    console.log('good value', newValue)
    setGood(newValue)
  }

  const setNeutralValue = newValue => {
    console.log('neutral value', newValue)
    setNeutral(newValue)
  }

  const setBadValue = newValue => {
    console.log('bad value', newValue)
    setBad(newValue)
  }

  return (
    <div>
      <Header text={headerText} />
      <Button handleClick={() => setGoodValue(good + 1)} text='good' />
      <Button handleClick={() => setNeutralValue(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBadValue(bad + 1)} text='bad' />
      <Header text={statsText} />
      <Statistics good={good} neutral={neutral} bad={bad} totalVotes={totalVotes} average={average} positivePercentage={positivePercentage} />
    </div>
  )
}

export default App