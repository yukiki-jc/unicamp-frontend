export default function stylizeObject(obj) {
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
    })
  }
  return obj
}
