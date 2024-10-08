/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";

import { Search } from "@bigbinary/neeto-icons";
import { Input, NoData, Pagination } from "@bigbinary/neetoui";
import productsApi from "apis/products";
import { Header, PageLoader } from "components/commons";
import useDebounce from "hooks/useDebounce";
import { isEmpty } from "ramda";

import ProductListItem from "./ProductListItem";
import { useFetchProducts } from "hooks/reactQuery/useProductsApi";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constants";

const Home = () => {
  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_INDEX);

  const debouncedSearchKey = useDebounce(searchKey);

  const productsParams = {
    searchTerm: debouncedSearchKey,
    page: currentPage,
    pageSize: DEFAULT_PAGE_SIZE,
  };

  const {data: { products = [], totalProductsCount } = {}, isLoading} = useFetchProducts(productsParams)

  // const fetchProducts = async () => {
  //   try {
  //     const data = await productsApi.fetch({ searchTerm: debouncedSearchKey });
  //     setProducts(data.products);
  //   } catch (error) {
  //     console.log("An error occurred:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, [debouncedSearchKey]);

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex h-screen flex-col">
      <div className="m-2">
        <Header
          shouldShowBackButton={false}
          title="Smile Cart"
          actionBlock={
            <Input
              placeholder="Search products"
              prefix={<Search />}
              type="search"
              value={searchKey}
              onChange={event => {
                setSearchKey(event.target.value);
                setCurrentPage(DEFAULT_PAGE_INDEX);
              }}
            />
          }
        />
      </div>
      {isEmpty(products) ? (
        <NoData className="h-full w-full" title="No products to show" />
      ) : (
        <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <ProductListItem key={product.slug} {...product} />
          ))}
        </div>
      )}
      <div>
        <Pagination
          navigate={page => setCurrentPage(page)}
          count={totalProductsCount}
          pageNo={currentPage || DEFAULT_PAGE_INDEX}
          pageSize={DEFAULT_PAGE_SIZE}
        />
      </div>
    </div>
  );
};

export default Home;
