"use client"

import { Filter, Sort } from "../utils/config"
import WishListDropdown from "./WishListDropdown"

const FILTERS: Filter[] = ["all", "purchased", "notPurchased"]
const SORTS: Sort[] = ["date", "priceAsc", "priceDesc"]

type Props = {
  selectedFilter: Filter
  setSelectedFilter: (filter: Filter) => void
  selectedSort: Sort
  setSelectedSort: (sort: Sort) => void
}

const WishlistOptions = ({
  selectedFilter,
  setSelectedFilter,
  selectedSort,
  setSelectedSort,
}: Props) => (
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

export default WishlistOptions
