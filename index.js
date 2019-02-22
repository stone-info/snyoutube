// npm install @microlink/youtube-dl
const { exec, mkdir } = require('shelljs');
let getUserHome       = () => (process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME']);
let downloadPath      = () => {
  mkdir('-p', getUserHome() + '/Downloads');
  return getUserHome() + '/Downloads';
};

let [dURL] = process.argv.splice(2);
if (!dURL) {dURL = `https://www.youtube.com/watch?v=JQGRg8XBnB4`;}

let proxy = `--proxy "socks5://127.0.0.1:1086"`;

let dPath = downloadPath();

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

  exec(`youtube-dl ${proxy} -f ${mp4ID}+${audioID} --no-progress "${dURL}" -o ${dPath}/'%(title)s'`, function (code, stdout, stderr) {

  });
});
