"use client"

import { useFetch } from "@hyper-fetch/react"
import { getProducts } from "@my-wishlist/api/routes/products"

const Product = () => {
  const { data: products } = useFetch(getProducts)

  return (
    <div>
      <p className="text-xl">Client</p>
      {products?.result.map(({ id, name }) => <p key={id}>{name}</p>)}
    </div>
  )
}

export default Product
