const inquirer = require('inquirer')
const semver = require('semver')
const validateNPMPackageName = require('validate-npm-package-name')

const INVALID_NAME = 'The provided name is not a valid npm package name'
const INVALID_VERSION = 'The provided version is not a valid semver version number'
const DEFAULT_PROJECT_TYPE = 'web-client'
const PROJECT_TYPE_WEB = 'web-client'

// get the choices from ub-registry
const setupQuestions = [
  {
    type: 'input',
    name: 'project_name',
    message: 'What is the name of your project?',
    validate: name => validateNPMPackageName(name) && name !== '' ? true : INVALID_NAME
  },
  {
    type: 'input',
    name: 'project_version',
    message: 'What is the initial version?',
    validate: version => semver.valid(version) ? true : INVALID_VERSION
  },
  {
    type: 'list',
    name: 'project_type',
    message: 'What is the kind of project you are building?',
    choices: [
      'web-client',
      'backend',
      'windows-client',
      'linux-client',
      'mac-client',
      'android-client',
      'ios-client'
    ],
    default: DEFAULT_PROJECT_TYPE
  },
  {
    type: 'list',
    name: 'template',
    message: 'Web client template to choose',
    choices: [
      'web-client/fast-pwa-react',
      'web-client/some-future-template'
    ],
    default: DEFAULT_PROJECT_TYPE,
    when: answers => answers.project_type === PROJECT_TYPE_WEB
  }
]

const setup = () => inquirer.prompt(setupQuestions)

module.exports = {
  setup
}
