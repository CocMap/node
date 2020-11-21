// ref: "https://attacomsian.com/blog/nodejs-convert-csv-to-json"

const csvToJson = require('csvtojson')
const fs = require('fs')

var benhNhan = null

csvToJson()
  .fromFile('data/BenhNhan.csv')
  .then(benhNhan => {
    console.log(benhNhan)
    fs.writeFile('output/benhNhan.json', JSON.stringify(benhNhan, null, 4), () => {
      console.log('BenhNhan array is saved SUCCESSFULLY!!!!!')
    })
  })
  .catch(err => {
    console.log(err)
  })





