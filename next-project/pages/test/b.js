import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useReducer,
  useRef,
  useContext
} from 'react';

import MyContext from '../../lib/my-context';
//类组件
class MyCount extends React.Component {
  state = {
    count: 0
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        count: this.state.count + 1
      })
    }, 1000);
  }

  // 在 componentWillUnmount 生命周期函数里面清除定时器之类的
  // 不然会造成内存泄漏
  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  render() {
    return (
      <span>{this.state.count}</span>
    )
  }
}

// useReducer
// 定义一个 'Reducer' 函数，它接受两个参数，第一个为 state，第二个为 action。 然后根据传进来的 action 操作 state
function countReducer(state, action) {
  switch (action.type) {
    case 'add':
      return state + 1
    case 'minus':
      return state - 1
    default:
      return state
  }
}

// 函数组件 hooks
function MyCountFunc() {
  // const [count, setCount] = useState(0)  //useState实现

  // useReducer 接受一个操作
  const [count, dispatchCount] = useReducer(countReducer, 0)    //useReducer实现
  const [name, setName] = useState('jingjing')
  const inputRef = useRef()  // useRef
  const context = useContext(MyContext)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // setCount(count => count + 1)    //useState
  //     dispatchCount({ type: 'minus' })
  //   }, 1000)
  //   return () => clearInterval(interval)
  // }, [])

  useEffect(() => {
    console.log('Effect invoked')
    console.log(inputRef)
    return () => console.log('Effect deteched')
  })

  useLayoutEffect(() => {
    console.log('LayoutEffect invoked')
    return () => console.log('LayoutEffect deteched')
  })

  return (
    <div>
      <input ref={inputRef} value={name} onChange={(e) => setName(e.target.value)}></input>
      <button onClick={() => dispatchCount({ type: 'add' })}>{count}</button>
      <p>{context}</p>
    </div>
  )
}


export default MyCountFunc