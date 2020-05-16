import Link from 'next/link';
import Router from 'next/router';
import { Button } from 'antd';
// export default () => <Button>index</Button>
export default () => {
  function goToB() {
    Router.push("/test/b")
  }
  return (
    <>
      <Link href="/a?id=1" as="/a/1">
        <Button>Index</Button>
      </Link>
      <Button onClick={goToB}>test B</Button>
    </>
  )
}