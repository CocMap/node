// ref: https://stackoverflow.com/questions/4647817/javascript-object-rename-key

const fs = require('fs')
const benhNhan = require("../output/benhNhan.json")

let oldKeys = ["MaBenhNhan", "NamSinh", "GioiTinh", "DiaChi"]
let newKeys = ["benhNhanId", "namSinh", "gioiTinh", "diaChi"]

async function renameJsonKey(object, oldKeys, newKeys) {
  object.forEach(element => {
    for (let i = 0; i < oldKeys.length; i++) {
      element[newKeys[i]] = element[oldKeys[i]]
      delete element[oldKeys[i]]
    }
  })
}

async function getLastName(object) {
  object.forEach(element => {
    let fullName = element["HoTen"]
    element["ten"] = fullName.split(" ").pop()
    element["ho"] = fullName.split(" ").slice(0, -1).join(" ")
    delete element["HoTen"]
  })
}

async function cleanEmptyData(object, keys) {
  object.forEach(element => {
    keys.forEach(key => {
      delete element[key]
    })
  })
}

async function print(result) {
  console.log(JSON.stringify(result, null, 4))
}

cleanEmptyData(benhNhan, ["MaNhomBenh", "TheoDoi", "GhiChu"])
  .then(getLastName(benhNhan))
  .then(renameJsonKey(benhNhan, oldKeys, newKeys))
  .then(print(benhNhan))
  .then(
    fs.writeFile('../output/benhNhan-cleaned.json', JSON.stringify(benhNhan, null, 4), () => {
      console.log('BenhNhan array is saved SUCCESSFULLY!!!!!')
    })
  )
