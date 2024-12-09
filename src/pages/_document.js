import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" itemScope itemType="http://schema.org/WebPage">
        <Head>
        {/* <link rel="icon" href="/favicon.ico" type="image/ico" /> */}
        {/* <link rel="apple-touch-icon" href="/logo192.png" /> */}
        <link rel="stylesheet" href='/css/aos.css'></link>            
        <link rel="stylesheet" href='/css/all.min.css'></link>       
        </Head>
        <body>         
          <Main />
          <NextScript />
          <script src="/js/jquery.min.js"></script>
          <script src="/js/bootstrap.min.js"></script>
          <script src="/js/pora.js.plugin.js"></script>   
          <script src="/js/validator.min.js"></script>
          <script src="/js/form-scripts.js"></script>
          <script src="/js/main.js"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
