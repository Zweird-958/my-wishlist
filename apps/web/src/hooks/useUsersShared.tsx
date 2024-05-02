import { useFetch } from "@hyper-fetch/react"

import { getUsersShared } from "@my-wishlist/api/routes/sharedWishes"

import useUsersSharedStore from "@/stores/usersShared"

const useUsersShared = () => {
  const { usersShared, setUsersShared, ...usersSharedStore } =
    useUsersSharedStore()
  const { data, loading, error, onSuccess } = useFetch(getUsersShared, {
    disabled: usersShared.length > 0,
  })

  onSuccess(({ response: { result } }) => {
    setUsersShared(result)
  })

  return {
    usersShared,
    isLoading: loading || (!data && !error),
    ...usersSharedStore,
  }
}

export default useUsersShared
