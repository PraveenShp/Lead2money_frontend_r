// src/pages/index.js
import MainLayout from "../layouts/MainLayout";
import HomeComponent from "../components/home/HomeComponent";

export default function Home() {
  return (
    <MainLayout>
      <HomeComponent />
    </MainLayout>
  );
}

export async function getServerSideProps(context) {

  return {
    props: {
     
    },
  };
}

