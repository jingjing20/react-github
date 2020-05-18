import App from 'next/app';

import 'antd/dist/antd.css';
import Layout from '../compontents/Layout';
class Myapp extends App {

  static async getInitialProps({ Component, ctx }) {
    console.log('app init')
    let pageProps
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return {
      pageProps
    }
  }

  render() {
    const { Component, pageProps } = this.props
    // console.log(Component)
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  }
}

export default Myapp