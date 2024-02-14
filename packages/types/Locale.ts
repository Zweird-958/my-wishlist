export type ExtractKeys<T extends string> =
  T extends `${string}{${infer Key}}${infer Rest}`
    ? Key | ExtractKeys<Rest>
    : never
export type TranslationInterpolator<
  T extends string,
  Keys = ExtractKeys<T>,
> = Keys extends string ? Record<Keys, string | number> : never
