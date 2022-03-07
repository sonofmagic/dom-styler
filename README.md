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
manager.setVariables(themeJson)
manager.setSingleVariable(property, value, priority)
manager.removeProperty(property)
manager.getPropertyValue(property)
manager.saveTheme(themeJson, key)
manager.sync()
```

## APIS

```ts
export declare type VariablesItem = {
  value?: string
  priority?: string
}
export declare type VariablesParamValue =
  | string
  | VariablesItem
  | ((variables: VariablesItem) => VariablesItem)
export declare type VariablesParamMap = Record<string, VariablesParamValue>
export declare type SetVariablesParams = VariablesParamMap[] | VariablesParamMap

export declare class DomStyler {
  root: HTMLElement
  style: CSSStyleDeclaration
  constructor(dom?: HTMLElement)
  private handleParam
  setVariables(param: SetVariablesParams): void
  setSingleVariable(property: string, value?: string, priority?: string): void
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
