import en from "./locales/en.json"
import fr from "./locales/fr.json"

const resources = { en, fr }

export default Object.entries(resources).reduce(
  (acc, [key, value]) => {
    acc[key] = { translation: value }

    return acc
  },
  {} as Record<string, Record<string, typeof resources.en>>,
)
