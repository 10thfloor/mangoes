const { spawn } = require('child_process');
const fs = require('fs');
const { src, dest, watch, series } = require('gulp');
var del = require('del');
const path = require('path');

const addContracts = () => {
  return new Promise((resolve, reject) => {
    const run = spawn('node', ['./node_modules/.bin/zos add ExampleContract'], {
      shell: true,
      cwd: path.resolve(__dirname, '../smart-contracts'),
    });

    run.on('exit', () => {
      resolve(run);
    });

    run.stdout.on('data', data => {
      console.log(data.toString().trim());
    });
    run.stderr.on('error', err => reject(err));
  });
};

const pushContracts = () => {
  return new Promise((resolve, reject) => {
    const run = spawn('node', ['./node_modules/.bin/zos push'], {
      shell: true,
      cwd: path.resolve(__dirname, '../smart-contracts'),
    });

    run.on('exit', () => {
      resolve(run);
    });

    run.stdout.on('data', data => {
      console.log(data.toString().trim());
    });
    run.stderr.on('error', err => reject(err));
  });
};

const restartSession = () => {
  return new Promise((resolve, reject) => {
    const run = spawn(
      'node',
      [
        './node_modules/.bin/zos session --network local --from 0xffcf8fdee72ac11b5c542428b35eef5769c409f0 --expires 3600 ',
      ],
      {
        shell: true,
        cwd: path.resolve(__dirname, '../smart-contracts'),
      },
    );

    run.on('exit', () => {
      resolve(run);
    });

    run.stdout.on('data', data => {
      console.log(data.toString().trim());
    });
    run.stderr.on('error', err => reject(err));
  });
};

const runGanache = () => {
  return new Promise((resolve, reject) => {
    del(path.resolve(__dirname, '../../accounts.txt'), {
      force: true,
    }).then(() => {
      const run = spawn(
        'node',
        [
          './node_modules/.bin/ganache-cli --accounts 10 --deterministic --networkId 5777 --port 7545',
        ],
        {
          shell: true,
          cwd: path.resolve(__dirname, '../smart-contracts'),
        },
      );

      run.stdout.on('data', data => {
        accounts = fs.createWriteStream(
          path.resolve(__dirname, '../../accounts.txt'),
          { flags: 'a' },
        );
        accounts.write(data);
      });
      run.stderr.on('error', err => reject(err));
      resolve(run);
    });
  });
};

const watchContracts = async cb => {
  console.log('Statring ganache-cli');
  let ganache = await runGanache();
  console.log('Done...');
  const watcher = watch(
    [path.resolve(__dirname, '../../contracts/*.sol')],
    function(cb) {
      ganache.kill();
      setTimeout(() => {
        del(path.resolve(__dirname, '../smart-contracts/contracts/*.sol'), {
          force: true,
        }).then(async () => {
          src(path.resolve(__dirname, '../../contracts/*.sol')).pipe(
            dest(path.resolve(__dirname, '../smart-contracts/contracts')),
          );

          console.log('Restarting ganache...');
          ganache = await runGanache();
          await addContracts();
          await pushContracts();
          await restartSession();
          console.log('Ganache restarted, contracts re-deployed ...');
          cb();
        });
      }, 0);
    },
  );
};

module.exports = {
  watchContracts,
};
