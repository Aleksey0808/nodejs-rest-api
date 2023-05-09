// const express = require('express')
// const logger = require('morgan')
// const cors = require('cors')

// const contactsRouter = require('./routes/api/contacts')

// const app = express()

// const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

// app.use(logger(formatsLogger))
// app.use(cors())
// app.use(express.json())

// app.use('/api/contacts', contactsRouter)

// app.use((req, res) => {
//   res.status(404).json({ message: 'Not found' })
// })

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message })
// })

// module.exports = app

// //////////////////////////////////////////
const express = require('express');
const app = express();
// const moment = require('moment');
// const fs = require('fs/promises')
const cors = require('cors');

const contactsRouter = require('./routes/api/contact')

// app.use( async(req, res, next) => {
//   const {method, url} = req;
//   const data = moment().format("DD-MM-YYYY_hh:mm:ss")
//   await fs.appendFile('./public/server.log', `\n${method}, ${url}, ${data}`)
//   next()
// })

// app.use( async(req, res, next) => { 
//   console.log('first middleware')
//   next()
// })

app.use(cors())

app.use('/api/contacts', contactsRouter)

app.get('/', async(req, res) => {
  res.send('<h2>Home page</h2>');
});

app.get('/api/products', async(req, res) => {
  // res.send(contactsRouter);
  res.json([]);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

app.use( async(req, res, next) => { 
  res.status(404).json({
    message: 'Not found'
  })
})


module.exports = app
