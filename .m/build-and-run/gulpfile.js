const gulp = require('gulp')
const chalk = require('chalk')
const {
  runClient,
  runApi,
  runDashboard,
  runDashboardApi,
  runNative,
  runStorybook,
  runDocs
} = require('./serve')
const { watchContracts } = require('./contracts')
const { watchPrismaSchema } = require('./prisma')

const serve = gulp.parallel(
  runClient,
  runApi,
  runDashboard,
  runDashboardApi,
  runNative,
  runStorybook,
  runDocs,
  watchContracts,
  watchPrismaSchema
)
serve.description = 'Start local development servers...'

const defaultTask = gulp.series(serve, cb => {
  console.log(chalk.yellow('\n✨🥭  Mangoes! 🥭✨\n'))

  console.log(chalk.yellow('Ganache cli: http://localhost:7545\n'))

  console.log(chalk.magenta('GraphQL API (prisma): http://locahost:4000/api'))
  console.log(chalk.magenta('GraphQL explorer: http://locahost:4000\n'))

  console.log(chalk.green('Client (nuxt) app: http://localhost:3000'))
  console.log(
    chalk.green('Development dashboard (nuxt): http://localhost:3333\n')
  )

  console.log(chalk.blue('Documentation (vuepress): http://localhost:8080'))
  console.log(
    chalk.yellow('Storybook (vue-storybook): http://localhost:9001\n')
  )

  console.log(chalk.red('Ionic App (@ionic/vue): http://localhost:8100'))

  cb()
})

module.exports = { serve, watchContracts }

module.exports.default = defaultTask
