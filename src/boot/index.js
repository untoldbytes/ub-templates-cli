const program = require('commander')
const download = require('download')
const ConfigStore = require('configstore')
const packageJSON = require('../../package.json')

const config = new ConfigStore(packageJSON.name)

const templateRegistry = 'https://ub-templates-registry.firebaseapp.com/templates/index.json'

download(templateRegistry)
  .then(data => config.set('templates', JSON.parse(data.toString())))
  .catch(console.error)

const boot = (actionHandler) => {
  program
    .version('0.1.0')
    .usage('[command]')
    .command('init <name>')
    .option('-f, --force', 'Force create even if the directory with given name exists')
    .description('initialize a project based on template selection wizard')
    .action(actionHandler)
    .on('--help', () => {
      console.log('  Examples:')
      console.log()
      console.log('    $ ub-templates init my-project')
      console.log()
    })

  program.parse(process.argv)

  if (program.args.length === 0) {
    program.help()
  }
}

module.exports = boot
