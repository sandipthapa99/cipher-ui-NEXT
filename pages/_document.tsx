import { Head, Html, Main, NextScript } from "next/document";
import { FunctionComponent } from "react";

const Document: FunctionComponent = () => {
    return (
        <Html lang="en">
            <Head key="site-head">
                <meta
                    key="ie=edge"
                    httpEquiv="X-UA-Compatible"
                    content="ie=edge"
                />
                <meta
                    key="x-ua-compatible"
                    httpEquiv="x-ua-compatible"
                    content="ie=edge"
                />
                <meta key="author" name="author" content="Cipher" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website"></meta>
                <meta property="og:image:type" content="image/*" />
                <meta property="og:site_name" content="Cipher" />
                <meta name="twitter:card" content="summary_large_image" />
                {/* <meta property="fb:app_id" content="648932238597477" />  */}
                <meta name="theme-color" content="#fff" />
                <link rel="manifest" href="/manifest.json" />

                <link
                    rel="shortcut icon"
                    href="/favicon/favicon.ico"
                    type="image/x-icon"
                />
                <link
                    rel="apple-touch-icon"
                    href="/favicon/apple-touch-icon.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="57x57"
                    href="/favicon/apple-touch-icon-57x57.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="72x72"
                    href="/favicon/apple-touch-icon-72x72.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="76x76"
                    href="/favicon/apple-touch-icon-76x76.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="114x114"
                    href="/favicon/apple-touch-icon-114x114.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="120x120"
                    href="/favicon/apple-touch-icon-120x120.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="144x144"
                    href="/favicon/apple-touch-icon-144x144.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="152x152"
                    href="/favicon/apple-touch-icon-152x152.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/favicon/apple-touch-icon-180x180.png"
                />
                <link rel="apple-touch-icon" href="/icon.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    rel="stylesheet"
                ></link>
            </Head>
            <body key="">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default Document;
