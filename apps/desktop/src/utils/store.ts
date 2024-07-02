import { Store } from "@tauri-apps/plugin-store"

import { config } from "@my-wishlist/config/desktop"

const store = new Store(config.store.name)

export default store
