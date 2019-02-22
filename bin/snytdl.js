#! /usr/bin/env node

const { exec, mkdir } = require('shelljs');
const program         = require('commander');
const ora             = require('ora');
const colors          = require('colors/safe');

let getUserHome  = () => (process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME']);
let downloadPath = () => {
  mkdir('-p', getUserHome() + '/Downloads');
  return getUserHome() + '/Downloads';
};

let dPath = downloadPath();

// let [dURL] = process.argv.splice(2);
// if (!dURL) {dURL = `https://www.youtube.com/watch?v=JQGRg8XBnB4`;}
// let proxy = `--proxy "socks5://127.0.0.1:1086"`;

// program
//   .version('0.1.0')
//   .option('-p, --proxy [proxy]', 'proxy mode')
//   .option('-h, --host [host]', 'host')
//   .on('option:proxy', function (proxy) {
//     // console.log(process.argv.slice(3));
//     // let [dURL] = process.argv.slice(2);
//     // if (!dURL) {dURL = `https://www.youtube.com/watch?v=JQGRg8XBnB4`;}
//     // ytdl(process.argv.slice(4));
//   })
//   .on('option:host', function (host) {
//     // console.log(process.argv.slice(3));
//     // let [dURL] = process.argv.slice(2);
//     // if (!dURL) {dURL = `https://www.youtube.com/watch?v=JQGRg8XBnB4`;}
//     // ytdl(process.argv.slice(4));
//   })
//
//   .parse(process.argv);

program
  .version('0.1.0')
  .option('-p, --proxy [proxy]', 'proxy mode')
  .option('-h, --host [host]', 'host')
  .on('option:proxy', function (proxy) {
    // console.log(process.argv.slice(3));
    // let [dURL] = process.argv.slice(2);
    // if (!dURL) {dURL = `https://www.youtube.com/watch?v=JQGRg8XBnB4`;}
    // ytdl(process.argv.slice(4));
  })
  .on('option:host', function (host) {
    // console.log(process.argv.slice(3));
    // let [dURL] = process.argv.slice(2);
    // if (!dURL) {dURL = `https://www.youtube.com/watch?v=JQGRg8XBnB4`;}
    // ytdl(process.argv.slice(4));
  })
  .parse(process.argv);

if (!process.argv.slice(3).length) {
  program.outputHelp(make_red);
  return;
}

function make_red (txt) {
  return colors.red(txt); //display the help text in red on the console
}

// let proxy = `--proxy "socks5://127.0.0.1:1086"`;

let proxy;
let dURL = `https://www.youtube.com/watch?v=JQGRg8XBnB4`;
if (program.proxy) {
  // console.log('  - proxy');
  proxy = `--proxy "${program.proxy}"`;
}
if (program.host) {
  // console.log('  - host');
  dURL = program.host;
}

ytdl(dURL, proxy);

function ytdl (dURL, proxy = '') {

  exec(`youtube-dl ${proxy} -F "${dURL}"`, function (code, stdout, stderr) {
    // console.log('Exit code:', code);
    // console.log('Program output:', stdout);
    // console.log('Program stderr:', stderr);
    let strings = stdout.split('\n').slice(4);
    let audioID;
    let mp4ID;

    let mp4s = strings.filter(item => /mp4/.test(item) && /\d+p/.test(item));

    let r;
    switch (true) {
      case 0 !== (r = mp4s.filter(item => /2160p60/.test(item))).length:
        mp4ID = r[0].substring(0, 3).trim();
        break;
      case 0 !== (r = mp4s.filter(item => /2160p/.test(item))).length:
        mp4ID = r[0].substring(0, 3).trim();
        break;
      case 0 !== (r = mp4s.filter(item => /1440p60/.test(item))).length:
        mp4ID = r[0].substring(0, 3).trim();
        break;
      case 0 !== (r = mp4s.filter(item => /1440p/.test(item))).length:
        mp4ID = r[0].substring(0, 3).trim();
        break;
      case 0 !== (r = mp4s.filter(item => /1080p60/.test(item))).length:
        mp4ID = r[0].substring(0, 3).trim();
        break;
      case 0 !== (r = mp4s.filter(item => /1080p/.test(item))).length:
        mp4ID = r[0].substring(0, 3).trim();
        break;
      case 0 !== (r = mp4s.filter(item => /720p60/.test(item))).length:
        mp4ID = r[0].substring(0, 3).trim();
        break;
      case 0 !== (r = mp4s.filter(item => /720p/.test(item))).length:
        mp4ID = r[0].substring(0, 3).trim();
        break;
      case 0 !== (r = mp4s.filter(item => /480p/.test(item))).length:
        mp4ID = r[0].substring(0, 3).trim();
        break;
      case 0 !== (r = mp4s.filter(item => /360p/.test(item))).length:
        mp4ID = r[0].substring(0, 3).trim();
        break;
      case 0 !== (r = mp4s.filter(item => /240p/.test(item))).length:
        mp4ID = r[0].substring(0, 3).trim();
        break;
      case 0 !== (r = mp4s.filter(item => /144p/.test(item))).length:
        mp4ID = r[0].substring(0, 3).trim();
        break;
      default:
      // console.log('no match');
    }

    let audios = strings.filter(item => /audio/.test(item) && /m4a/.test(item));
    if (audios.length > 0) {audioID = audios[0].substring(0, 3).trim();}

    exec(`youtube-dl ${proxy} -f ${mp4ID}+${audioID} --no-progress "${dURL}" -o ${dPath}/'%(title)s'`, function (code, stdout, stderr) {});
  });
}
