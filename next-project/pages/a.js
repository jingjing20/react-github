import { withRouter } from 'next/router'
import Comp from '../compontents/comp';
import styled from 'styled-components';
import moment from 'moment';

//styled-components
const Title = styled.h1`
  color: yellow;
  font-size: 30px;
`
const A = ({ router, name, age, time }) => (
  <>
    <Title>jingjing {time}</Title>
    <a>
      <Comp>A {router.query.id}{name}{age}</Comp>
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
  const promise = new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: 'jingjing',
        age: 20,
        time: moment(Date.now() - 60 * 1000).fromNow()
      })
    }, 1000)
  })
  return await promise
}

export default withRouter(A)