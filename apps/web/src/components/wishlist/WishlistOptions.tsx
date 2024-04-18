import WishListDropdown from "@/components/wishlist/WishListDropdown"
import useWishlist from "@/hooks/useWishlist"
import { Filter, Sort } from "@/utils/config"

const FILTERS: Filter[] = ["all", "purchased", "notPurchased"]
const SORTS: Sort[] = ["date", "priceAsc", "priceDesc"]

const WishlistOptions = () => {
  const { selectedFilter, setSelectedFilter, selectedSort, setSelectedSort } =
    useWishlist()

  return (
    <div className="flex justify-between">
      <WishListDropdown
        items={FILTERS.map((filter) => ({ key: filter, label: filter }))}
        selectedItem={selectedFilter}
        onSelectionChange={setSelectedFilter}
        translationKey="filters"
      />
      <WishListDropdown
        items={SORTS.map((sort) => ({ key: sort, label: sort }))}
        selectedItem={selectedSort}
        onSelectionChange={setSelectedSort}
        translationKey="sorts"
      />
    </div>
  )
}

export default WishlistOptions
