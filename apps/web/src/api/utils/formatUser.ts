import type { User } from "@/api/types"

const formatUser = ({ id, username }: Pick<User, "id" | "username">) => ({
  id,
  username,
})

export default formatUser
