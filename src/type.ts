export type VariablesItem = {
  value?: string
  priority?: string
}

export type VariablesParamValue =
  | string
  | VariablesItem
  | ((variables: VariablesItem) => VariablesItem)

export type VariablesParamMap = Record<string, VariablesParamValue>

export type SetVariablesParams = VariablesParamMap[] | VariablesParamMap
