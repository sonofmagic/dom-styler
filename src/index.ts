import type { VariablesParamMap, SetVariablesParams } from './type'

const defaultCacheKey = 'global-theme'
export class DomStyler {
  root: HTMLElement
  style: CSSStyleDeclaration
  constructor (dom?: HTMLElement) {
    this.root = dom || document.documentElement
    this.style = this.root.style
  }

  private handleParam (param: VariablesParamMap) {
    Object.entries(param).reduce<VariablesParamMap>((acc, [k, v]) => {
      if (typeof v === 'string') {
        this.setSingleVariable(k, v)
      } else if (typeof v === 'object') {
        this.setSingleVariable(k, v.value, v.priority)
      } else if (typeof v === 'function') {
        const value2 = this.getPropertyValue(k)
        const priority2 = this.getPropertyPriority(k)
        const { value, priority } = v({
          value: value2,
          priority: priority2
        })
        this.setSingleVariable(k, value, priority)
      }
      acc[k] = v
      return acc
    }, {})
  }

  setVariables (param: SetVariablesParams) {
    if (Array.isArray(param)) {
      for (let i = 0; i < param.length; i++) {
        this.handleParam(param[i])
      }
    } else if (typeof param === 'object') {
      this.handleParam(param)
    } else {
      throw new TypeError('param must be an object!')
    }
  }

  setSingleVariable (property: string, value?: string, priority?: string) {
    return this.style.setProperty(property, value ?? null, priority)
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

  sync (cacheKey = defaultCacheKey) {
    const theme = window.sessionStorage.getItem(cacheKey)
    if (theme) {
      try {
        const themeJson = JSON.parse(theme)
        this.setVariables(themeJson)
        return themeJson
      } catch (error) {
        window.sessionStorage.removeItem(cacheKey)
      }
    }
  }

  saveTheme (theme: Record<string, string>, cacheKey = defaultCacheKey) {
    window.sessionStorage.setItem(cacheKey, JSON.stringify(theme))
  }
}

export const createDocumentElementStyler = () => {
  return new DomStyler()
}

export const createDomStyler = (dom: HTMLElement) => {
  return new DomStyler(dom)
}
