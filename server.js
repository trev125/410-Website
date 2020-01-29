const express = require('express')
const EnforcerMiddleware = require('openapi-enforcer-middleware')
const path = require('path')

const app = express()
app.use(express.json())

const controllerDirectory = path.resolve(__dirname, 'app/controllers')
const mockDirectory = path.resolve(__dirname, 'app/mock-controllers') 
const pathToOpenApiDoc = path.resolve(__dirname, 'app/CYOA-OpenApi.yaml')

// Create an enforcer middleware instance
const enforcer = EnforcerMiddleware(pathToOpenApiDoc)
enforcer.promise.catch(console.error)

app.use(function (req, res, next) {
  console.log('I have recieved a request')
  console.log(req.method, req.path)
  next()
})

app.all('/character', (req, res, next) => {
  req.test = 'hello there'
  console.log('I edited the request', req.test)
  next()
})

app.get('/character', (req, res, next) => {
  console.log('I am accessing the edited stuff in the route', req.test)
  //res.send(req.test)
  next()
})

// Add mocking middleware to the enforcer middleware.
// This middleware will handle explicit mock requests.

// enforcer.mocks(mockDirectory,false)
//   .catch(console.error)

// Add controller middleware to the enforcer middleware .
// This middleware will handle requests for real data.

// enforcer.controllers(controllerDirectory)
//   .catch(console.error)

// Add fallback mocking middleware to the enforcer middleware.
// This middleware will automatically run mocking if the
// controller could not produce a response.
enforcer.mocks(mockDirectory,true)
  .catch(() => {}) // Any errors will have already been reported by explicit mock middleware

// Add the enforcer middleware runner to the express app.
app.use(enforcer.middleware())

// Add error handling middleware
app.use((err, req, res, next) => {
  // If the error was in the client's request then send back a detailed report
  if (err.statusCode >= 400 && err.statusCode < 500 && err.exception) {
    res.set('Content-Type', 'text/plain')
    res.status(err.statusCode)
    res.send(err.message)

  // If it's unsafe to send back detailed errors then send back limited error information
  } else {
    console.error(err.stack)
    res.sendStatus(err.statusCode || 500)
  }
})

const listener = app.listen(3000, err => {
  if (err) return console.error(err.stack)
  console.log('Server listening on port ' + listener.address().port)
})