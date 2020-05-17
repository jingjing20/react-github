import { withRouter } from 'next/router'
import dynamic from 'next/dynamic';
// import Comp from '../compontents/comp';
const Comp = dynamic(import('../compontents/comp'))
import styled from 'styled-components';
// import moment from 'moment';

//styled-components
const Title = styled.h1`
  color: yellow;
  font-size: 30px;
`
const A = ({ router, name, age, time }) => (
  <>
    <Title>jingjing {time}</Title>
    <Comp></Comp>
    <a>
      A {router.query.id}{name}{age}
    </a>
    <style jsx>{`
      a{
        color:red
      }
    `}</style>
  </>
)

A.getInitialProps = async (ctx) => {
  console.log('---------------')

  // webpack 异步加载 分开打包
  const moment = await import('moment');
  const promise = new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: 'jingjing',
        age: 20,
        time: moment.default(Date.now() - 60 * 1000).fromNow()
      })
    }, 0)
  })
  return await promise
}

export default withRouter(A)