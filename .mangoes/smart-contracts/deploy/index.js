// const { spawn } = require('child_process');
// const path = require('path');

// const ganache = spawn(
//   'node',
//   [
//     './node_modules/.bin/ganache-cli --deterministic --networkId 5777 --port 7545',
//   ],
//   { shell: true },
// );

// let gotdata;
// ganache.stdout.on('data', data => {
//   if (!gotdata) {
//     gotdata = true;

//     zos = spawn(
//       'node',
//       [
//         path.resolve(
//           __dirname,
//           '../smart-contracts-deploy/node_modules/.bin/zos add ExampleContract',
//         ),
//       ],
//       {
//         shell: true,
//         cwd: path.resolve(__dirname, '../../services/smart-contracts-service'),
//       },
//     );

//     // TODO
//   }
// });
