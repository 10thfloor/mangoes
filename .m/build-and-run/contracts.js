const { spawn } = require('child_process')
const fs = require('fs')
const { src, dest, watch, series } = require('gulp')
var del = require('del')
const path = require('path')

const copyContracts = () => {
  console.log('Copying contracts...')
  return new Promise(resolve => {
    del(path.resolve(__dirname, '../smart-contracts/contracts/*.sol'), {
      force: true
    }).then(async () => {
      src(path.resolve(__dirname, '../../contracts/*.sol'))
        .pipe(dest(path.resolve(__dirname, '../smart-contracts/contracts')))
        .on('finish', resolve)
    })
  })
}

const addContracts = () => {
  const contracts = []

  fs.readdirSync(
    path.resolve(__dirname, '../smart-contracts/contracts')
  ).forEach(file => {
    contracts.push(file.split('.').shift())
  })

  const zos = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../smart-contracts/zos.json'))
  )

  zos.contracts = {}

  contracts.forEach(c => {
    zos.contracts[c] = c
  })

  fs.writeFileSync(
    path.resolve(__dirname, '../smart-contracts/zos.json'),
    JSON.stringify(zos)
  )

  // TODO: Better checks for contracts with errors, duped names...etc

  return new Promise((resolve, reject) => {
    const track = done()
    contracts.forEach(name => {
      const run = spawn('node', [`./node_modules/.bin/zos add ${name}`], {
        shell: true,
        cwd: path.resolve(__dirname, '../smart-contracts')
      })

      run.stdout.on('data', data => {
        console.log(data.toString().trim())
      })

      run.on('exit', () => {
        track()
      })

      run.on('error', err => {
        console.log(err)
        reject(err)
      })
    })

    function done() {
      count = 0
      return () => {
        count = count + 1
        if (count === contracts.length) {
          resolve()
        }
      }
    }
  })
}

const pushContracts = () => {
  return new Promise((resolve, reject) => {
    const run = spawn('node', ['./node_modules/.bin/zos push'], {
      shell: true,
      cwd: path.resolve(__dirname, '../smart-contracts')
    })

    run.on('exit', () => {
      resolve()
    })

    run.on('error', err => {
      console.log(err)
      reject(err)
    })

    run.stdout.on('data', data => {
      console.log(data.toString().trim())
    })
    run.stderr.on('error', err => reject(err))
  })
}

const restartSession = () => {
  return new Promise((resolve, reject) => {
    const run = spawn(
      'node',
      [
        './node_modules/.bin/zos session --network local --from 0xffcf8fdee72ac11b5c542428b35eef5769c409f0 --expires 3600 '
      ],
      {
        shell: true,
        cwd: path.resolve(__dirname, '../smart-contracts')
      }
    )

    run.on('exit', () => {
      resolve()
    })

    run.on('error', err => {
      console.log(err)
      reject(err)
    })

    run.stdout.on('data', data => {
      console.log(data.toString().trim())
    })
    run.stderr.on('error', err => reject(err))
  })
}

const runGanache = () => {
  return new Promise((resolve, reject) => {
    del(path.resolve(__dirname, '../../accounts.txt'), {
      force: true
    }).then(() => {
      const run = spawn(
        'node',
        [
          './node_modules/.bin/ganache-cli --accounts 10 --deterministic --networkId 5777 --port 7545'
        ],
        {
          shell: true,
          cwd: path.resolve(__dirname, '../smart-contracts')
        }
      )

      run.stdout.on('data', data => {
        accounts = fs.createWriteStream(
          path.resolve(__dirname, '../../accounts.txt'),
          { flags: 'a' }
        )
        accounts.write(data)
      })
      run.stderr.on('error', err => reject(err))
      resolve(run)
    })
  })
}

const watchContracts = async cb => {
  console.log('Statring ganache-cli')
  let ganache, starting
  starting = true
  ganache = await runGanache()

  await copyContracts()
  await restartSession()
  await addContracts()
  await pushContracts()

  console.log('Done...')
  watch([path.resolve(__dirname, '../../contracts/*.sol')], function(cb) {
    if (starting) {
      starting = false
      cb()
      return
    } else {
      ganache.kill()
      setTimeout(() => {
        del(path.resolve(__dirname, '../smart-contracts/contracts/*.sol'), {
          force: true
        }).then(() => {
          src(path.resolve(__dirname, '../../contracts/*.sol'))
            .pipe(dest(path.resolve(__dirname, '../smart-contracts/contracts')))
            .on('finish', async () => {
              console.log('Restarting ganache...')

              ganache = await runGanache()

              await restartSession()
              await addContracts()
              await pushContracts()

              console.log('Ganache restarted, contracts re-deployed ...')
              cb()
            })
        })
      }, 500)
    }
  })
}

module.exports = {
  watchContracts
}
