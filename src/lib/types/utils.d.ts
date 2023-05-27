export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type ApiParams<T extends string> = {
  params: {
    [K in T]: string
  }
}
