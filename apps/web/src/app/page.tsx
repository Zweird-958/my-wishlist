import { sendRequest } from "@hyper-fetch/core"
import { getProducts } from "@my-wishlist/api/routes/products"
import { Button } from "@nextui-org/react"

import ProductList from "@/components/ProductList"

const Home = async () => {
  const { data: products } = await sendRequest(getProducts)

  if (!products) {
    return <Button>nothin</Button>
  }

  return (
    <div>
      <p className="text-primary text-xl">Server</p>
      {products.result.map(({ id, name }) => (
        <p key={id}>{name}</p>
      ))}
      <ProductList />
    </div>
  )
}

export default Home
