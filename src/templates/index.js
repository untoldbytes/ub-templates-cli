const fs = require('fs-extra')
const path = require('path')
const download = require('download')
const ConfigStore = require('configstore')

const files = require('../files')
const packageJSON = require('../../package.json')

const config = new ConfigStore(packageJSON.name)
const tempDir = path.join(process.cwd(), 'ub-temp')

const initialize = (directory, setup) => new Promise((resolve, reject) => {
  if (setup.template === undefined) {
    return reject(new Error('template not provided'))
  }

  console.log('getting template', setup.template)

  files.createDirectory(directory)

  const [templateCategory, template] = setup.template.split('/')

  const templateToGet = config.get('templates')[templateCategory][template].url

  download(templateToGet, tempDir, {
    extract: true
  }).then(() => {
    const extractedDir = fs.readdirSync(tempDir)[0]
    fs.moveSync(path.join(tempDir, extractedDir), directory, {
      overwrite: true
    })
    // need to move contents of extractedDir one level above of it
    const templatePackageJson = JSON.parse(fs.readFileSync(path.join(directory, 'package.json'), {
      encoding: 'utf8'
    }))

    templatePackageJson.name = setup.project_name
    templatePackageJson.version = setup.project_version

    const packageJsonPath = path.join(directory, 'package.json')
    fs.writeFileSync(packageJsonPath, JSON.stringify(templatePackageJson, null, 2))

    console.log('done')
    return resolve('success')
  }).catch(console.error)
})

module.exports = {
  initialize
}

// cd into project dir or create dir then cd
// look up from a template registry
// download zip from remote
// unpack
// update package.json
// run npm install ?
// signal success
