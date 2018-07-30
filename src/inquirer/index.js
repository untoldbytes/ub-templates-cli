const inquirer = require('inquirer')
const semver = require('semver')
const validateNPMPackageName = require('validate-npm-package-name')

const INVALID_NAME = 'The provided name is not a valid npm package name'
const INVALID_VERSION = 'The provided version is not a valid semver version number'
const PROJECT_TYPE_PWA = 'pwa'
const DEFAULT_PROJECT_TYPE = PROJECT_TYPE_PWA

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
      'pwa',
      'backend',
      'desktop',
      'mobile'
    ],
    default: DEFAULT_PROJECT_TYPE
  },
  {
    type: 'list',
    name: 'template',
    message: 'PWA template to choose',
    choices: [
      'pwa/fast-pwa-react',
      'pwa/some-future-template'
    ],
    default: DEFAULT_PROJECT_TYPE,
    when: answers => answers.project_type === PROJECT_TYPE_PWA
  }
]

const setup = () => inquirer.prompt(setupQuestions)

module.exports = {
  setup
}
