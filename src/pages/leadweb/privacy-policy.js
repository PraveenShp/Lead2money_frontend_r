// import MainLayout from "../../../layouts/MainLayout";
// import { fetchSeoData } from "../../../util/axiosRequest";

import PrivacyPolicy from "../../components/home/PrivacyPolicy";



export default function SmeGroupHealth({seoData, curr_time,pathname}) {

  return (
        <PrivacyPolicy pathname={pathname}/>
    // <MainLayout seo={seoData} curr_time={curr_time}>
    // </MainLayout>
  );
}

export async function getServerSideProps(context) {
    const { resolvedUrl } = context;

    // const cookies = await parseCookies(context.req);


    try {

        const { new_url, data, curr_time } = await fetchSeoData(resolvedUrl);

        if (new_url) {
            // Perform a 301 redirect
            return {
                redirect: {
                    destination: new_url,
                    permanent: true, // 301 redirect
                },
            };
        }
        return {
            props: {
                pathname: resolvedUrl,
                seoData: JSON.parse(atob(data)),
                curr_time: curr_time,
            },
        };

    } catch (error) {
        return {
            props: {
                pathname: resolvedUrl,
                seoData: "",
                curr_time: "",
            }
        }; // Return an empty object or default SEO data
    }
}