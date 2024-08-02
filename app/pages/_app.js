require('isomorphic-fetch');
import App from 'next/app';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import { Provider } from '@shopify/app-bridge-react';
import translations from '@shopify/polaris/locales/en.json';
import Cookies from 'js-cookie';

import '@shopify/polaris/styles.css';
import '../css/data-table.css';

// Application headers and configuration
class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        const config = { apiKey: API_KEY, shopOrigin: Cookies.get("shopOrigin"), forceRedirect: true };
        return (
            <React.Fragment>
                <Head>
                    <title>Sample Shopify Product Search App</title>
                    <meta charSet="utf-8" />
                </Head>
                <Provider config={config}>
                    <AppProvider i18n={translations}>
                        <Component {...pageProps} />
                    </AppProvider>
                </Provider>
            </React.Fragment>
        );
    }
}

export default MyApp;