const { spawn } = require('child_process')
const nodemon = require('gulp-nodemon')
const path = require('path')

const runClient = cb => {
  const run = spawn('yarn dev', {
    shell: true,
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '../../www')
  })
  run.stdout.on('data', data => {
    cb()
  })
  run.stderr.on('error', err => cb(err))
  run.on('error', err => {
    console.log('Error!')
  })
  return run
}

const runApi = cb => {
  const stream = nodemon({
    cwd: path.resolve(__dirname, '../../api'),
    script: 'index.js',
    watch: [
      './**/*.js',
      path.resolve(__dirname, '../.m/smart-contracts/build/*.json')
    ],
    quiet: true
  }).on('crash', function() {
    console.error('API server has crashed!\n')
    stream.emit('restart', 10) // restart the server in 10 seconds
  })
  cb()
}

const runDashboard = cb => {
  const run = spawn('yarn dev', {
    shell: true,
    cwd: path.resolve(__dirname, '../dev-dashboard')
  })
  run.stdout.on('data', data => {
    cb()
  })
  run.stderr.on('error', err => cb(err))
  return run
}

const runDashboardApi = cb => {
  const run = spawn('yarn dev', {
    shell: true,
    cwd: path.resolve(__dirname, '../dev-dashboard-server')
  })
  run.stdout.on('data', data => {
    cb()
  })
  run.on('error', err => {
    console.log('Error!')
  })
  return run
}

const runNative = cb => {
  const run = spawn('yarn dev', {
    shell: true,
    cwd: path.resolve(__dirname, '../../native')
  })
  run.stdout.on('data', data => {
    cb()
  })
  run.stderr.on('error', err => cb(err))
  return run
}

const runStorybook = cb => {
  const run = spawn('yarn dev', {
    shell: true,
    cwd: path.resolve(__dirname, '../../storybook')
  })
  run.stdout.on('data', data => {
    cb()
  })
  run.stderr.on('error', err => cb(err))
  return run
}

const runDocs = cb => {
  const run = spawn('yarn docs:dev', {
    shell: true,
    cwd: path.resolve(__dirname, '../../documentation')
  })
  run.stdout.on('data', data => {
    cb()
  })
  run.stderr.on('error', err => cb(err))
  return run
}

module.exports = {
  runClient,
  runApi,
  runDashboard,
  runDashboardApi,
  runNative,
  runStorybook,
  runDocs
}
