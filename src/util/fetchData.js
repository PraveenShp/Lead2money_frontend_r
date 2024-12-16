
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchData(endpoint, options = {}, loader = null) {
  try {
    // If a loader is passed, show the loader
    if (loader) loader.setIsLoading(true); 
 
    const headers = options.body instanceof FormData
      ? { ...options.headers }
      : {
          'Content-Type': 'application/json',
          ...options.headers,
        };

    const response = await fetch(`${apiBaseUrl}/${endpoint}`, {
      ...options,
      headers,
    });  

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    const data = contentType && contentType.includes('application/json')
      ? await response.json()
      : await response.text();

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  } finally {
    // Hide loader when the fetch is done
    if (loader) loader.setIsLoading(false);
  }
}

export {};



export const apiConfig = {
    apiImgUrl: process.env.NEXT_PUBLIC_API_IMG_BASE_URL || '',
    apilaravelUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '',
    saltKey: process.env.NEXT_PUBLIC_SALT_KEY || '',
    merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID || '',
    saltIndex: process.env.NEXT_PUBLIC_SALT_INDEX || '',
    paymentUrl: process.env.NEXT_PUBLIC_API_PAYMENT_URL || '',
    paymentMobile: process.env.NEXT_PUBLIC_API_PAYMENT_MOBILE_NUMBER || '',
    liveUrl2: process.env.NEXT_PUBLIC_PHONE_PAY_SUCCESS_URL || '',
    apiLiveUrl: process.env.NEXT_PUBLIC_API_PRODUCTION_URL || '',
  };
  // Optional: Export individual variables if needed
  export const { apiImgUrl,apilaravelUrl,saltKey, merchantId, saltIndex, paymentUrl, paymentMobile, liveUrl2 ,apiLiveUrl} = apiConfig;
