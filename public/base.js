const CHARS_64 = "-_0123456789abcdefghijklmnopqrstuvwxyzABCDEFJHIJKLMNOPQRSTUVWXYZ"
const CHARS_16 = "0123456789abcdef"

const pushToArrInObj = (obj, key, val) => {
  if (obj[key] === undefined) {
    obj[key] = [val]
  } else obj[key].push(val)
}

const cpy = (x) => {
  if (typeof x === "object") {
    if (x instanceof Array) {
      return x.map(cpy)
    } else {
      const result = {}
      for (let key in x) {
        result[key] = cpy(x[key])
      }
      return result
    }
  } else return x
}

const kebabToCamel = (str) =>
  str.replaceAll(/-([a-z])/g, (_match, letter) => letter.toUpperCase())

const camelToKebab = (str) =>
  str.replaceAll(/([a-z])([A-Z])/g, (_match, lower, upper) => lower + "-" + upper.toLowerCase())

const idElements = {}
for (let uniqueElement of document.querySelectorAll("[id]")) {
  idElements[kebabToCamel(uniqueElement.id)] = uniqueElement
}

const templates = {}
for (let template of idElements.templatesContainer.content.children) {
  // convert ids to camel case because it allows . syntax, which is slightly faster and prettier
  templates[kebabToCamel(template.className)] = template
}


let goServerUrl = location.protocol + "//" + location.hostname + ":3000"



const deviceSettings = {}
const deviceSettingsLS = localStorage.getItem("jg-device-settings")
if (deviceSettingsLS) {
  try {
    deviceSettings = JSON.parse(deviceSettingsLS)
  } catch (e) {
    localStorage.setItem("jg-device-settings", "{}")
  }
}

const saveDeviceSettings = () => {
  localStorage.setItem("jg-device-settings", JSON.stringify(deviceSettings))
}

const setDeviceSetting = (name, value) => {
  deviceSettings[name] = value
  localStorage.setItem("jg-device-settings", JSON.stringify(deviceSettings))
}