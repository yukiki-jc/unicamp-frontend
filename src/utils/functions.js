export const stylizeObject = (obj) => {
  if (obj instanceof Array) {
    return obj.map(item => stylizeObject(item))
  } else if (typeof obj == 'object') {
    Object.keys(obj).forEach(key => {
      if (/\_(\w)/.test(key)) {
        let new_key = key.replace(/\_(\w)/g, (_, one) => one.toUpperCase())
        obj[new_key] = obj[key]
        obj[key] = undefined
        delete obj[key]
        obj[new_key] = stylizeObject(obj[new_key])
      }
      else {
        obj[key] = stylizeObject(obj[key])
      }
    })
  }
  return obj
}

export const reStylizeObject = (obj) => {
  if (obj instanceof Array) {
    return obj.map(item => reStylizeObject(item))
  } else if (typeof obj == 'object') {
    Object.keys(obj).forEach(key => {
      if (/[A-Z]/.test(key)) {
        let new_key = key.replace(/([A-Z])/g,"_$1").toLowerCase();
        obj[new_key] = obj[key]
        obj[key] = undefined
        delete obj[key]
        obj[new_key] = reStylizeObject(obj[new_key])
      }
      else {
        obj[key] = reStylizeObject(obj[key])
      }
    })
  }
  return obj
}

export const errorHandler = (e, pageContextValue) => {
  console.log(e)
  pageContextValue.handler.setErrorBox("Connect Error")
  pageContextValue.handler.setLoading(false)
}