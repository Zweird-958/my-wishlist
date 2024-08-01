import type { User } from "@prisma/client"

const formatUser = ({ id, username }: User) => ({
  id,
  username,
})

export default formatUser
