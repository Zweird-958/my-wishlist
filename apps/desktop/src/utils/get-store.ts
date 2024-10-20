import { createStore } from "@tauri-apps/plugin-store"

import { config } from "@my-wishlist/config/desktop"

const getStore = async () => await createStore(config.store.name)

export default getStore
