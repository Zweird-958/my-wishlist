import { Store } from "@tauri-apps/plugin-store"

import { config } from "@my-wishlist/config/desktop"

const getStore = async () => await Store.load(config.store.name)

export default getStore
