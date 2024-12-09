import { useLoader } from '../context/LoaderContext';

const GlobalLoader = () => {
  const { isLoading } = useLoader();

  if (!isLoading) return null;

  return (
    <div class="fixed inset-0 flex items-center justify-center bg-blue-700 bg-opacity-50 z-50">
      <img class="loader-img" src="/images/loading.gif" alt="Loading" />
    </div>

  );
};

export default GlobalLoader;
