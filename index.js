const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const path = require('path')
const bodyParser = require('body-parser')
const { response } = require('express')
const { request } = require('http')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// require = require('esm')(module)
// module.exports = require('./public/app')
// import func from "../JavaScript/app.cjs"
// func ();


// Это с сайта https://www.w3schools.com/nodejs/nodejs_uploadfiles.asp
// там ещё много полезного связанного с node js
// поищи через ctrl + f  "(3000)", так как то, что получилось запустить написано в файле js, но с частичкой html
// надо лишь изменить путь, выбрать, какое название мы хотим в итоге у файла и загружать просто в HTML этот файл
// app.js и app.html (просто страница) ни к чему не подключены, нам это и не нужно
// попробуй реализовать всё на одной странице
// всё, что закомментировано, работает только при определённых условиях, но если пригодится, то хорошо, поэтому не стал удалять


var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
const { url } = require('inspector')

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = 'C:/Users/Хозяин/Desktop/JavaScript/uploads/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(4000);


// Определение endsWith, так как в консоли ошибка из-за неопределения
// if (typeof String.prototype.endsWith !== 'function') {
//   String.prototype.endsWith = function(suffix) {
//       return this.indexOf(suffix, this.length - suffix.length) !== -1;
//   };

// Попытка выгрузить фото
// photo()
// // Добавление фото на сайт. Тест 
// function photo(request, response) {
//   if (request.url.endsWith('.jpg')) {
//     let imgFile = request.url.slice(l)

//     fs.readFile(imgFile, (err, data) => {
//       if (err) throw err

//       response.setHeader('Content-Type', 'image/jpg')
//       response.statusCode = 200
//       response.write(data)
//       response.end()
//     })
//   }
// }
// }


app.use(express.static('public'))








// //////////////////////////////////////////////////////////////////
// const upload = multer({ dest: 'storage' })
// app.use(express.static(__dirname))



// import multer from 'multer';

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + "--" + file.originalname);
//     }
// });  

// const fileFilter = (req, file, cb) => {
//     if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
//         cb(null, true);
//     } else{
//         cb(null, false);

//     }

// };


// app.post('/upload', upload.single('file'), function (req, res) {
//   let filedata = req.file
//   console.log(filedata)
// })
// app.use(multer({
//   dest: './public/uploads/',
//   rename: function (fieldname, filename) {
//       return filename.replace(/\W+/g, '-').toLowerCase();
//   }
// }));
// router.post("/upload",function(req, res, next){
//     console.log(req.file);
// });
//////////////////////////////////////////////////////////////////


//  let upload = multer({ storage: storage, fileFilter: fileFilter,});

//Открытие файла
// fs.get('C:/Users/Хозяин/Desktop/JavaScript/uploads', (err, data) => {
// console.log(data)
// })

/*
  Во первых у тебя нет роута, чтобы сервер отдал этот файл
  GET http://localhost:3000/node_modules/blueimp-file-upload/js/jquery.fileupload.js net::ERR_ABORTED 404 (Not Found)
*/

app.get('/', (request, respons) => {
  // path must be absolute or specify root to res.sendFile
  // respons.sendFile('./index.html')

  // https://ru.hexlet.io/blog/posts/chto-takoe-__dirname-v-javascript
  /*
    теперь путь правильный
    возможно, если у тебя до этого и так работало, на винде, например, это особоенность винды. 
    1. Пример как я сделал более правильный
    2. Проект должен работать на любой ОС и как раз такие моменты как путь в винде, линуксе и макос различаются.
    С://Program \/Files/Desktop/PetProject
    
    https://idg.net.ua/blog/uchebnik-css/ispolzovanie-css/otnositelnyj-i-absolyutnyj-put-k-fajlu
  */
  respons.sendFile(path.resolve(__dirname, './public/index.html'))
})

app.post('/', urlencodedParser, (request, respons) => {
  if (!request.body) return respons.sendStatus(400)
  console.log(request.body)
  respons.sendFile('./index.html')
})

// Массив со всеми подключениями
connections = []

// Сработает при подключении к странице
io.sockets.on('connection', function (socket) {
  console.log('Успешное соединение')
  connections.push(socket)

  // При отключении от сервера
  socket.on('disconnect', function (data) {
    connections.splice(connections.indexOf(socket), 1)
    console.log('Отключились')
  })

  // Функция получающая сообщение от какого-либо пользователя
  socket.on('send mess', function (data) {
    // 'add mess' будет вызвано у всех пользователей и у них добавиться новое сообщение
    io.sockets.emit('add mess', {
      mess: data.mess,
      name: data.name,
      //avatar: data.avatar,
    })
  })
})














// app.post('/upload-avatar', upload.single('avatar'), async (req, res) => 
// {
//     try {
//         const avatar = req.file;
//  // make sure file is available
//  if (!avatar) {
//     res.status(400).send({
//         status: false,
//         data: 'No file is selected.'
//     });
// } else {
//     // send response
//     res.send({
//         status: true,
//         message: 'File is uploaded.',
//         data: {
//             name: avatar.originalname,
//             mimetype: avatar.mimetype,
//             size: avatar.size
//         }
//     });
// }

// } catch (err) {
// res.status(500).send(err);
// }
// });


// let abfe="Hi"
// console.log(abfe);
server.listen(3000)