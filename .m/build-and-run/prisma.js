const { src, dest, watch, series } = require('gulp')
const { spawn } = require('child_process')
const path = require('path')

const watchPrismaSchema = cb => {
  watch([path.resolve(__dirname, '../../api/*.graphql')], function(cb) {
    console.log('Updating prisma schema...')
    const run = spawn('yarn prisma deploy --force', {
      shell: true,
      cwd: path.resolve(__dirname, '../../api')
    })
    run.stdout.on('data', () => {
      cb()
    })
  })
  cb()
}

module.exports = {
  watchPrismaSchema
}
