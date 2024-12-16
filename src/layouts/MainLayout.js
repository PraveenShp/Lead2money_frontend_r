import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import Head from "next/head";

const MainLayout = ({ children, seo}) => {

  return (
    <>
        <Head>
        <title>{seo?.title || "Lead2Money"}</title>
        </Head>
        <Header/>
        <main>{children}</main>
        <Footer/>
      </>

  );
};

export default MainLayout;
