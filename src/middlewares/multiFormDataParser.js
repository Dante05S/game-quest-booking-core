const multer = require('multer')
const SIZE_LIMIT = 5 * 1024 * 1024 // 5MB

const multipartFormDataParser = multer({
  storage: multer.memoryStorage(),
  limits: { fieldSize: SIZE_LIMIT },
  startProcessing(req, busboy) {
    req.rawBody ? busboy.end(req.rawBody) : req.pipe(busboy)
  }
})

module.exports = multipartFormDataParser
