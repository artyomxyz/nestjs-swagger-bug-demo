const { fork } = require('child_process');
const path = require('path');
const TscWatchClient = require('tsc-watch/client');

const watch = new TscWatchClient();

let childProcess;

function kill() {
  if (childProcess) {
    childProcess.kill();
    childProcess = null;
  }
}

function stop() {
  kill();
  watch.kill();
  process.exit(0);
}

function run() {
  kill();
  const execArgv = [];
  if (process.env.DEBUG_PORT) {
    execArgv.push(`--inspect=${process.env.DEBUG_PORT}`)
  }
  childProcess = fork(path.join(__dirname, 'dist', 'bootstrap.js'), [], {
    execArgv,
  });
}

watch.on('success', () => run());

watch.start('--noClear', '--compiler', 'ttypescript/bin/tsc', '--project', path.join(__dirname, 'tsconfig.json'));

process.on('SIGINT', () => stop());

