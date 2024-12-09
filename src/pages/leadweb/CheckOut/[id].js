import { useRouter } from 'next/router';
import Checkout from '../../../components/Checkout.js';

export default function ProductDetailsPage({ seoData, curr_time, pathname }) {
  return (
    <Checkout pathname={pathname} seoData={seoData} curr_time={curr_time} />
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;  // Get dynamic id from URL
  const resolvedUrl = context.resolvedUrl;
  
  try {
    // Fetch SEO data or any other data you need using the `id`
    const { new_url, data, curr_time } = await fetchSeoData(resolvedUrl);

    if (new_url) {
      // Redirect if new_url is provided
      return {
        redirect: {
          destination: new_url,
          permanent: true,
        },
      };
    }

    return {
      props: {
        pathname: resolvedUrl,
        seoData: JSON.parse(atob(data)),
        curr_time,
      },
    };
  } catch (error) {
    return {
      props: {
        pathname: resolvedUrl,
        seoData: "",
        curr_time: "",
      },
    };
  }
}
