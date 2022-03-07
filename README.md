# dom-styler

> dom-styler,manage your dom style easily!

## Usage

```ts
import {
  DomStyler,
  createDocumentElementStyler,
  createDomStyler
} from 'dom-styler'

const manager = new DomStyler(dom)
// same to
const manager1 = createDomStyler(dom)
// default document.documentElement
const docManager = createDocumentElementStyler()

const themeJson = {
  width: '100px',
  height: {
    value: '100vh',
    priority: 'important'
  },
  color: (value, priority) => {
    return {
      value: newValue,
      priority: newPriority
    }
  }
}
// also you can set themeJson as an array
const key = 'custom-theme'
manager.setRootVariables(themeJson)
manager.setRootSingleVariable(property, value, priority)
manager.removeProperty(property)
manager.getPropertyValue(property)
manager.saveTheme(themeJson, key)
manager.sync()
```

## APIS

```ts
export declare type RootVariablesItem = {
  key: string
  value: string
  priority: string
}
export declare type PickedRootVariablesItem = Pick<
  RootVariablesItem,
  'value' | 'priority'
>
export declare type RootVariablesParamValue =
  | string
  | PickedRootVariablesItem
  | ((param: PickedRootVariablesItem) => PickedRootVariablesItem)
export declare type RootVariablesParamMap = Record<
  string,
  RootVariablesParamValue
>
export declare type SetRootVariablesParams =
  | RootVariablesParamMap[]
  | RootVariablesParamMap

export declare class DomStyler {
  root: HTMLElement
  style: CSSStyleDeclaration
  constructor(dom?: HTMLElement)
  setRootVariables(
    param: SetRootVariablesParams
  ): RootVariablesParamMap | import('./type').RootVariablesItem[]
  setRootSingleVariable(
    property: string,
    value: string | null,
    priority?: string
  ): void
  removeProperty(property: string): string
  item(index: number): string
  getPropertyValue(property: string): string
  getPropertyPriority(property: string): string
  sync(cacheKey?: string): any
  saveTheme(theme: Record<string, string>, cacheKey?: string): void
}
export declare const createDocumentElementStyler: () => DomStyler
export declare const createDomStyler: (dom: HTMLElement) => DomStyler
```
