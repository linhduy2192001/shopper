import Paginate from "@/components/Paginate";
import Portal from "@/components/Portal";
import ProductCard, { ProductCardLoading } from "@/components/ProductCard";
import { PROFILE_TITLE_ID } from "@/config";
import { useQuery } from "@/hooks/useQuery";
import { useScrollTop } from "@/hooks/useScrollTop";
import { useSearch } from "@/hooks/useSearch";
import { productService } from "@/services/product.service";
import queryString from "query-string";
import React from "react";

export default function WishlistPage() {
  const [search] = useSearch({
    page: 1,
  });

  const qs = queryString.stringify({
    page: search.page,
  });
  const {
    loading,
    data,
    refetch: fetchWishlist,
    clearPreviousData,
  } = useQuery({
    queryKey: [qs],
    queryFn: () => productService.getWishlist(`?${qs}`),
    keepPrevousData: true,
  });

  return (
    <>
      <Portal selector={PROFILE_TITLE_ID}>Sản phẩm yêu thích</Portal>
      {/* Products */}
      <div className="row">
        {loading
          ? Array.from(Array(15)).map((e, i) => <ProductCardLoading key={i} />)
          : data?.data?.map((e) => <ProductCard key={e.id} {...e} />)}
      </div>
      {/* Pagination */}
      <Paginate totalPage={data?.paginate?.totalPage} />
      <Portal selector={PROFILE_TITLE_ID}>Sản phẩm yêu thích</Portal>
      {/* Products */}
      <div className="row">
        {loading
          ? Array.from(Array(15)).map((e, i) => <ProductCardLoading key={i} />)
          : data?.data?.map((e) => <ProductCard key={e.id} {...e} />)}
      </div>
      {/* Pagination */}
      <Paginate totalPage={data?.paginate?.totalPage} />
    </>
  );
}
