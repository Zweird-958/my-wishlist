import mw from "@/api/mw"

const handler = mw({
  GET: [
    async ({ send, db }) => {
      const products = await db.product.findMany()

      return send(products)
    },
  ],
})

export { handler as GET }
