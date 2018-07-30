#!/usr/bin/env node

const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const path = require('path')
const _ = require('lodash')

const boot = require('./boot')
const files = require('./files')
const inquirer = require('./inquirer')
const templates = require('./templates')

const tempDir = path.join(process.cwd(), 'ub-temp')
const handleError = error => console.error(chalk.red(error.message))
const handleSetup = (dirName, setup) =>
  templates.initialize(dirName, setup)
    .then(() => {
      console.log(chalk.blue('Project Setup Complete'))
    })
    .catch(handleError)

process.on('SIGTERM', () => console.log('terminated by user')) // Not working

const separator = '----------------------------------------------------' // determine how to set this to availabl width
const banner = figlet.textSync('ub-templates', { horizontalLayout: 'full' })
console.log(chalk.yellow(banner))

const execute = (name, options) => {
  files.deleteDirectory(tempDir)
  const dirName = path.join(process.cwd(), name)
  // console.log(dirName, options.force)
  if (files.directoryExists(dirName) && options.force !== true) {
    console.log(chalk.red('Directory already exists, try calling with -f option'))
    process.exit()
  }

  if (files.directoryExists(dirName) && options.force === true) {
    console.log(chalk.yellow(separator))
    console.log(chalk.yellow('Attempting to delete directory'))
    files.deleteDirectory(dirName)
    console.log(chalk.yellow('Directory deleted successfully'))
    console.log(chalk.yellow(separator))
    console.log()
  }

  console.log(chalk.green(separator))
  console.log(chalk.green(`Beginning setup for project ${name}`))
  console.log(chalk.green(separator))
  console.log()

  inquirer
    .setup()
    .then(_.partial(handleSetup, dirName))
    .catch(handleError)
}

boot(execute)

// clear()
// above is causing the rendering of upcoming log to throw
