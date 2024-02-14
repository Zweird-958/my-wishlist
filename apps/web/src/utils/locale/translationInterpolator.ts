import type {
  ExtractKeys,
  TranslationInterpolator,
} from "@my-wishlist/types/Locale"

const translationInterpolator = <T extends string>(
  translation: T,
  values: TranslationInterpolator<T>,
) =>
  translation.replace(/\{([^{}]+)\}/gu, (_, key: ExtractKeys<T>) =>
    String(values[key]),
  )

export default translationInterpolator
