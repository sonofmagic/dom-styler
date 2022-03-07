export type RootVariablesItem = {
  key: string
  value: string
  priority: string
}

export type PickedRootVariablesItem = Pick<
  RootVariablesItem,
  'value' | 'priority'
>

export type RootVariablesParamValue =
  | string
  | PickedRootVariablesItem
  | ((param: PickedRootVariablesItem) => PickedRootVariablesItem)

export type RootVariablesParamMap = Record<string, RootVariablesParamValue>

export type SetRootVariablesParams =
  | RootVariablesParamMap[]
  | RootVariablesParamMap
