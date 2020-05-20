import Link from 'next/link';
import Router from 'next/router';
import { Button } from 'antd';
import { connect } from 'react-redux'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
import store from '../store/store';
const Index = ({ count, username }) => {
  function goToB() {
    Router.push("/test/b")
  }
  return (
    <>
      <span>Count: {count}</span>
      <a>username: {username}</a>
      <a href={publicRuntimeConfig.OAUTH_URL}>去登录</a>
    </>
  )
}

export default connect(
  function mapStateToProps(state) {
    return {
      count: state.count.count,
      username: state.username.username
    }
  }
)(Index)