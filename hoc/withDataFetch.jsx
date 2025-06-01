import Loader from "@/components/Loader";
import useFetch from "@/hooks/useFetch";

export default function withDataFetching(WrappedComponent, url, config = {}) {
  const DataFetchComponent = (props) => {
    const { data, isLoading, error } = useFetch(url, config);

    if (isLoading) return <Loader />;

    return (
      <WrappedComponent
        {...props}
        data={data}
        isLoading={isLoading}
        error={error}
      />
    );
  };

  DataFetchComponent.displayName = `withDataFetching(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
  return DataFetchComponent;
};