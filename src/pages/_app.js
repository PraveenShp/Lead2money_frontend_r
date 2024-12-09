import React, { useEffect } from 'react';
import { Poppins } from '@next/font/google';
import  "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import '../styles/globals.css';
import '../styles/style.css';
import '../styles/responsive.css';
import '../styles/swiper.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from '../store';
import { LoaderProvider } from '../context/LoaderContext';
import  GlobalLoader  from '../components/GlobalLoader';

const inter = Poppins(
  {
    weight: ['100', '200', '300', '400', '500', '600', '700', '900'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
  }
);

function App({ Component, pageProps }) {


  useEffect(() => {
    // Ensure ToastContainer renders only on client
    import('react-toastify').then((module) => {
      const toast = module.toast;
      if (!toast.isActive) {
        toast.configure();
      }
    });
  }, []);
  return (
    <Provider store={store}>
      <LoaderProvider>
      <div className={inter.className}>
      <GlobalLoader />
      <Component {...pageProps} />
      <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </LoaderProvider>
    </Provider>
  );
}

export default App;
