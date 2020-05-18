import Link from 'next/link';
import Router from 'next/router';
import { Button } from 'antd';

import store from '../store/store';
export default () => {
  function goToB() {
    Router.push("/test/b")
  }
  return (
    <>
      <span>Index</span>
      <a>index a</a>
    </>
  )
}