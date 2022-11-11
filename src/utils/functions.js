export const stylizeObject = obj => {
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
      } else {
        obj[key] = stylizeObject(obj[key])
      }
    })
  }
  return obj
}

export const reStylizeObject = obj => {
  if (obj instanceof Array) {
    return obj.map(item => reStylizeObject(item))
  } else if (typeof obj == 'object') {
    Object.keys(obj).forEach(key => {
      if (/[A-Z]/.test(key)) {
        let new_key = key.replace(/([A-Z])/g, '_$1').toLowerCase()
        obj[new_key] = obj[key]
        obj[key] = undefined
        delete obj[key]
        obj[new_key] = reStylizeObject(obj[new_key])
      } else {
        obj[key] = reStylizeObject(obj[key])
      }
    })
  }
  return obj
}

export function sumArr (arr) {
  var sum = 0
  arr.forEach(val => {
    sum += val
  })
  return sum
}

export function average(arr) {
  var ratingSum = 0
  var numberSum = 0
  arr.forEach((val, idx) => {
    ratingSum += val * (idx + 1);
    numberSum += val;
  })
  return numberSum ? (ratingSum / numberSum) : 0;
}
