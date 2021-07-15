import '../styles/globals.scss';
import type { AppContext, AppProps } from 'next/app';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Router from 'next/router';

import { wrapper } from '../store';
import App from 'next/app';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

class MyApp extends App {
  static async getServer({ Component, ctx }: AppContext) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default wrapper.withRedux(MyApp);
