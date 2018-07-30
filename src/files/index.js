const fs = require('fs-extra')
const path = require('path')

const getCurrentDirectoryBase = () => path.basename(process.cwd())

const directoryExists = (filePath) => {
  try {
    return fs.statSync(filePath).isDirectory()
  } catch (err) {
    return false
  }
}

const createDirectory = directory => fs.ensureDirSync(directory)
const deleteDirectory = directory => fs.emptyDirSync(directory)

module.exports = {
  createDirectory,
  deleteDirectory,
  getCurrentDirectoryBase,
  directoryExists
}
