import type { User } from "../types"

const formatUser = ({ id, username }: Pick<User, "id" | "username">) => ({
  id,
  username,
})

export default formatUser
