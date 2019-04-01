const IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i
const CAMEL_REG = /-?(?=[A-Z])/g

export function diffProps (dom, newProps, oldProps) {
  for (let key in newProps) {
    if (
      key !=='children' &&
      key!=='key' &&
      (
        !oldProps ||
        ((key === 'value' || key === 'checked') ? dom : oldProps)[key] !== newProps[key]
      )
    ) {
			setProperty(dom, key, newProps[key], oldProps[key])
		}
  }
  for (let key in oldProps) {
  }
}

export function setProperty (dom, name, value, oldValue) {
  if (name === 'style') {
    let s = dom.style
    if (typeof value === 'string') {
			s.cssText = value
		} else {
			if (typeof oldValue === 'string') {
        s.cssText = ''
      } else {
				for (let i in oldValue) {
					if (value==null || !(i in value)) {
            s.setProperty(i.replace(CAMEL_REG, '-'), '')
          }
				}
			}
			for (let i in value) {
				v = value[i];
				if (oldValue==null || v!==oldValue[i]) {
					s.setProperty(i.replace(CAMEL_REG, '-'), typeof v==='number' && IS_NON_DIMENSIONAL.test(i)===false ? (v + 'px') : v)
				}
			}
		}
  } else if (value == null) {
    dom.removeAttribute(name)
  } else if (typeof value !== 'function') {
    dom.setAttribute(name, value)
  }
}
