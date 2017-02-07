
// Helper
function isArray(val) {
  return typeof val === 'object' && typeof val.length === 'number'
}

// Starter
function Argvalid(validations, info) {
  let result;

  // If Validation is an Array
  if(isArray(validations)) {
    // If it's Array then make a group with 2 member for each group
    let i = 0
    const toValidate = []
    while(i < validations.length) {
      let itemToCheck = {
        obj: validations[i],
        validation: validations[i+1]
      }
      toValidate.push(itemToCheck)
      i += 2
    }

    // Validate it
    const result = toValidate.map((item) => validate(item.obj, item.validation))

    // Make A Result As A Concated Object
    const newObject = {}
    result.forEach((item) => {
      let name = Object.keys(item)
      let value = item[name]
      newObject[name] = value
    })
    return newObject
  }
  else result = validate(validations, info)
  return result
}


// VALIDATE IT!
function validate(obj, validation) {
  // Destructuring for futher action
  const { type, required, defaultValue, validator } = validation
  const name = Object.keys(obj)[0]
  let target = obj[name]

  // Check Wether Has a custom validator
  const hasCustomValidator = validator !== undefined && typeof validator === 'function'

  // Get The Name of Constructor
  const regex = /function (\w+)/g
  let getTypeName = (item) => {
    let match, result;
    while(match = regex.exec(item.toString())) {
      result = match[1]
    }
    return result
  }

  // Declare A Type Name For Error Message
  let typeName;
  // If Array Types
  if (isArray(type) && !hasCustomValidator) {
    typeName = type.map((item) => {
      return getTypeName(item)
    })
    typeName = typeName.join(' or ')
  }

  // If Ordinary Types
  else if (!hasCustomValidator) typeName = getTypeName(type)

  // Fill the varaible if it isn't filled and there's a default value
  if (defaultValue !== undefined && defaultValue !== null) {
    let isFunc = typeof defaultValue === 'function'
    if (isFunc) target = defaultValue()
    else target = defaultValue
  }

  // Check wether it's filled
  const isFilled = target !== undefined && target !== null

  // Validate if it's required
  if (required && !isFilled) {
    if (!hasCustomValidator) throw new Error(`[Argvalid]: Variable "${name}" is required. Please fill it with a ${typeName}`)
    throw new Error(`[Argvalid]: Variable "${name}" is required. Please fill it with a valid value to your custom validator`)
  }

  // Check The Actual Type To make a match Constructor from Primitive Value
  const actualType = typeof target
  let ctor;
  switch (actualType) {
    case 'string':
      ctor = String
      break;
    case 'number':
      ctor = Number
      break;
    case 'boolean':
      ctor = Boolean
      break;
    case 'object':
      let isArray = typeof target.length === 'number'
      if (isArray) ctor = Array
      else {
        if (isArray(type)) throw new Error(`[Argvalid]: Array Types With Custom Constructor Is Not Supported Yet`)
        ctor = type
      }
      break;
  }

  // Make A Constructor For an instance
  const instance = new ctor(target)

  // Make A Validation
  const isValid = (validator) => {

    // Make a function to Validate
    let doValidate;
    if (typeof validator !== 'function') doValidate = (instance, item) => instance instanceof item
    else doValidate = (instance) => validator(instance.valueOf())

    // If Array Types
    if (isArray(type) && !validator) {
      let valid = false
      type.forEach((item) => {
        let shouldValid = doValidate(instance, item)
        if (shouldValid) valid = true
      })
      return valid
    }
    return doValidate(instance, type)
  }

  // If Not Valid, Throw Error
  if (!isValid(validator)) {
    if (!hasCustomValidator) throw new Error(`[Argvalid]: Variable "${name}" should be a ${typeName} but got ${actualType}`)
    throw new Error(`[Argvalid]: Variable "${name}" is not valid with your custom validator`)
  }

  return { [name]: target }
}


module.exports = Argvalid;
