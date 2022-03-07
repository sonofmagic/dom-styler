type RootVariablesItem = {
  key: string
  value: string
  priority: string
}

type PickedRootVariablesItem = Pick<RootVariablesItem, 'value' | 'priority'>

type RootVariablesParamValue =
  | string
  | PickedRootVariablesItem
  | ((param: PickedRootVariablesItem) => PickedRootVariablesItem)

type RootVariablesParamMap = Record<string, RootVariablesParamValue>

type setRootVariablesParams = RootVariablesItem[] | RootVariablesParamMap

export class ThemeVariablesManager {
  root: HTMLElement
  style: CSSStyleDeclaration
  constructor (dom?: HTMLElement) {
    this.root = dom || document.documentElement
    this.style = this.root.style
  }

  setRootVariables (param: setRootVariablesParams) {
    if (Array.isArray(param)) {
      for (let i = 0; i < param.length; i++) {
        const { key, value, priority } = param[i]
        this.setRootSingleVariable(key, value, priority)
      }
      return param
    } else if (typeof param === 'object') {
      return Object.entries(param).reduce<RootVariablesParamMap>(
        (acc, [k, v]) => {
          if (typeof v === 'string') {
            this.setRootSingleVariable(k, v)
          } else if (typeof v === 'object') {
            this.setRootSingleVariable(k, v.value, v.priority)
          } else if (typeof v === 'function') {
            const value2 = this.getPropertyValue(k)
            const priority2 = this.getPropertyPriority(k)
            const { value, priority } = v({
              value: value2,
              priority: priority2
            })
            this.setRootSingleVariable(k, value, priority)
          }
          acc[k] = v
          return acc
        },
        {}
      )
    }
    throw new TypeError('param must be an object!')
  }

  setRootSingleVariable (
    property: string,
    value: string | null,
    priority?: string
  ) {
    return this.style.setProperty(property, value, priority)
  }

  removeProperty (property: string) {
    return this.style.removeProperty(property)
  }

  item (index: number) {
    return this.style[index]
  }

  getPropertyValue (property: string) {
    return this.style.getPropertyValue(property)
  }

  getPropertyPriority (property: string) {
    return this.style.getPropertyPriority(property)
  }

  sync (key = 'global') {
    const cacheKey = `${key}-theme`
    const theme = window.sessionStorage.getItem(cacheKey)
    if (theme) {
      try {
        const themeJson = JSON.parse(theme)
        this.setRootVariables(themeJson)
        return themeJson
      } catch (error) {
        window.sessionStorage.removeItem(cacheKey)
      }
    }
  }

  saveTheme (theme: Record<string, string>, key = 'global') {
    const cacheKey = `${key}-theme`
    window.sessionStorage.setItem(cacheKey, JSON.stringify(theme))
  }
}

export const createGlobalThemeManager = () => {
  return new ThemeVariablesManager()
}

export const createDomThemeManager = (dom: HTMLElement) => {
  return new ThemeVariablesManager(dom)
}
