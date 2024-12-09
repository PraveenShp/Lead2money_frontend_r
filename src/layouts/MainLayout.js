import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({ children, seo}) => {

  return (
    <>
        <Header/>
        <main>{children}</main>
        <Footer/>
      </>

  );
};

export default MainLayout;
