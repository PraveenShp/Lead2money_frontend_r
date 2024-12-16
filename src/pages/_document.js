import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

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
           {/* jQuery और Bootstrap को पहले लोड करें */}
           <Script src="/js/jquery.min.js" strategy="beforeInteractive" // jQuery को पहले लोड करें ताकि Bootstrap सही से काम कर सके
          />

          <Script src="/js/bootstrap.min.js" strategy="beforeInteractive"  />
          
          {/* अन्य स्क्रिप्ट्स को पेज इंटरएक्टिव होने के बाद लोड करें */}
          <Script src="/js/pora.js.plugin.js" strategy="afterInteractive"  />
          <Script src="/js/validator.min.js" strategy="beforeInteractive" /> 
          <Script src="/js/form-scripts.js" strategy="afterInteractive" // पेज लोड होने के बाद
          />
          <Script src="/js/main.js" strategy="afterInteractive" // पेज लोड होने के बाद
          />
            {/* AOS JS को asynchronously लोड करें */}
          <Script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js" strategy="beforeInteractive"  // यह सुनिश्चित करता है कि JS स्क्रिप्ट पेज के interactive होने के बाद लोड हो
          />
          {/* AOS को इनिशियलाइज करें */}
          <Script
            id="aos-init-script" // Inline स्क्रिप्ट के लिए id एट्रिब्यूट जोड़ें
            dangerouslySetInnerHTML={{
              __html: `
                if (typeof AOS !== 'undefined') {
                  AOS.init();
                }
              `,
            }}
            strategy="beforeInteractive"
          />

          
        </body>
      </Html>
    );
  }
}

export default MyDocument;
