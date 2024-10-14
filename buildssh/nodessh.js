const commander = require('commander')
const fs = require('fs')
// const path = require('path')
const node_ssh = require('node-ssh')
const archiver = require('archiver')
const ssh = new node_ssh();

commander.version('0.1.0')
  .option('--zip_dir [value]', 'subproject dir')
  .option('--zip', 'need zip')
  .option('--dist [value]', 'upload file name , contain surfix')
  .option('--service [value]', 'gitbooks\'s name, folder in nginx')
  .option('--env_mode [value]', 'env mode')
  .option('--remote_host [value]', 'remote_host')
  .option('--remote_user [value]', 'remote_user')
  .option('--remote_pwd [value]', 'remote_pwd')
  .option('--service_root [value]', 'service_root')
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  commander.outputHelp()
  return
}

if (!commander.zip_dir || !commander.dist || !commander.service) {
  commander.outputHelp()
  return
}

// let remote_host = '172.21.101.253'
// let remote_user = 'root'
// let remote_pwd = 'vavWkXAfWmM03MCG'

let remote_host = `${commander.remote_host}`
let remote_user = `${commander.remote_user}`
let remote_pwd = `${commander.remote_pwd}`

const cwd = process.cwd();
const dist_zip = `${commander.dist}`
const local_zip = `${cwd}/${dist_zip}`
let service_root = `${commander.service_root}`
const service_dir = `${commander.service}`
// cygnusAdmin
// cygnus-test
if (commander.env_mode === 'prod') {
  remote_host = ''
  remote_user = ''
  remote_pwd = ''
  service_root = ''
}

// let remote_init_command = `
// if [ -d "${service_root}/${service_dir}" ]; then
//   rm -rf "${service_root}/${service_dir}/*"
// fi
// `

// if (fs.exists(local_zip)) {
//   fs.unlinkSync(local_zip)
// }
if (fs.existsSync(local_zip)) {
  fs.unlinkSync(local_zip)
}
let output
let archive
// create a file to stream archive data to.
if (commander.zip) {
  output = fs.createWriteStream(local_zip);
  archive = archiver('zip', {
    // Sets the compression level.
    zlib: {
      level: 5
    }
  });

  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  output.on('close', function () {
    console.log(`${archive.pointer()  } total bytes`);
    console.log('archiver has been finalized and the output file descriptor has closed.');

    upload()
    
    // new Promise((resolve) => {
    //   setTimeout(() => resolve(), 2000)
    // }).then(() => upload())
  });

  // This event is fired when the data source is drained no matter what was the data source.
  // It is not part of this library but rather from the NodeJS Stream API.
  // @see: https://nodejs.org/api/stream.html#stream_event_end
  output.on('end', function () {
    console.log('Data has been drained');
  });

  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
      // log warning
      console.log(`${JSON.stringify(err)}`);
    } else {
      // throw error
      throw err;
    }
  });

  // good practice to catch this error explicitly
  archive.on('error', function (err) {
    throw err;
  });

  // pipe archive data to the file
  archive.pipe(output);

  // 添加src目录，第二个参数表示在压缩文件中不建立文件夹，散落在root目录
  archive.directory(`${cwd}/${commander.zip_dir}`, false);

  // 添加src目录，第二个参数表示在压缩文件中建立文件夹的名字
  // archive.directory(`${cwd}/${commander.zip_dir}`, `${service_dir}`);

  archive.finalize();
} else {
  // 不用压缩文件，就上传指定文件
  upload()
}

function upload() {
  ssh.connect({
    host: remote_host,
    username: remote_user,
    password: remote_pwd
  }).then(() => {
    return ssh.exec(`rm -rf ${service_root}/${service_dir}/*`, [], {
      cwd: "",
      onStdout(chunk) {
        console.log('stdoutChunk', chunk.toString('utf8'))
      },
      onStderr(chunk) {
        console.log('stderrChunk', chunk.toString('utf8'))
      },
    }).then(() => {
      console.log("开始上传文件")
      return ssh.putFile(local_zip, `${dist_zip}`)
    }).then(() => {
      console.log("上传完成，开始解压")
      return ssh.exec(`unzip -d ${service_root}/${service_dir} ${dist_zip}`, [], {
        cwd: "",
        onStdout(chunk) {
          console.log('stdoutChunk', chunk.toString('utf8'))
        },
        onStderr(chunk) {
          console.log('stderrChunk', chunk.toString('utf8'))
        },
      })
      // }).then(() => {
      //   console.log("解压完成，移动文件夹")
      //   return ssh.exec(`mv ${service_dir} ${service_root}`, [], {
      //     cwd: "",
      //     onStdout(chunk) {
      //       console.log('stdoutChunk', chunk.toString('utf8'))
      //     },
      //     onStderr(chunk) {
      //       console.log('stderrChunk', chunk.toString('utf8'))
      //     },
      //   })
    }).then(() => {
      console.log("解压完成，删除上传文件")
      return ssh.exec(`rm -f ${dist_zip}`, [], {
        cwd: "",
        onStdout(chunk) {
          console.log('stdoutChunk', chunk.toString('utf8'))
        },
        onStderr(chunk) {
          console.log('stderrChunk', chunk.toString('utf8'))
        },
      })
    }).then(() => {
      console.log("全完成")
      return ssh.dispose();
    });
  }, (error) => {
    console.log("Something's wrong")
    console.log(error)
  })
}
