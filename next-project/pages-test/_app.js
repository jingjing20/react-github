import App from 'next/app';
import { Provider } from 'react-redux';

import MyContext from '../lib/my-context';
import 'antd/dist/antd.css';
import Layout from '../compontents/Layout';
import store from '../store/store';

class Myapp extends App {
  state = {
    context: 'value'
  }

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
        <Provider store={store}>
          <MyContext.Provider value="haohao">
            <Component {...pageProps} />
          </MyContext.Provider >
        </Provider>
      </Layout>
    )
  }
}

export default Myapp