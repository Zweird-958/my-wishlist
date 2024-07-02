/* eslint-disable no-await-in-loop */
import { readFile, readdir, writeFile } from "fs/promises"

const LOCALES_PATH = "./packages/i18n/src/locales"

const dir = await readdir(LOCALES_PATH)

type Data = Record<string, string>
type LocaleData = Record<string, Data>

for (const locale of dir) {
  const localeData: LocaleData = {}
  const jsonDir = await readdir(`${LOCALES_PATH}/${locale}`)

  for (const json of jsonDir) {
    const jsonPath = `${LOCALES_PATH}/${locale}/${json}`
    const content = await readFile(jsonPath, {
      encoding: "utf8",
    })
    const jsonParsed = JSON.parse(content)
    const data: Data = {}

    for (const key in jsonParsed) {
      // eslint-disable-next-line max-depth
      if (!jsonParsed[key]) {
        continue
      }

      data[key] = jsonParsed[key]
    }

    localeData[json.replace(".json", "")] = data
  }

  await writeFile(
    `./apps/desktop/locales/${locale}.json`,
    JSON.stringify(localeData),
  )
}
