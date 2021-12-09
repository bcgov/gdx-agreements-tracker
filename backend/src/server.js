require('dotenv').config({ path:  '.env' })
const cors = require('cors');
const express = require('express')
const app = express()
const port = process.env.SERVER_PORT || 8080;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const audit = require('express-request-audit');
const winston = require('winston');

/**
 * Put all the api options in one place.
 */
const apiOptions = {}

/**
 * This is the logger that is used, with various levels of output.  Currently it only goes to console, 
 * but could be outputted to files.
 */
const logger  = winston.createLogger({
    level: 'test' === process.env.NODE_ENV ? 'warn' : process.env.LOG_LEVEL || 'debug',
    format: winston.format.combine(
        winston.format.simple(),
        winston.format.prettyPrint()
    ),
    transports: [
        new winston.transports.Console(),
    ],
});

/** Middleware */

app.use(cors(apiOptions.cors))

/**
 * The Audit middleware, which is called every time an api call is made.
 * This is what is used to write to db for the api calls.
 */
app.use(audit({
    auditor: event => {
        logger.silly(event);
    },
    excludeURLs: [],
    request: {
        excludeBody: ['*'],
    },
    response: {
        excludeHeaders: ['*'],
    },

}))


/**
 * sets up endpoint for api-docs.
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/** API endpoints */

/**
 * Root endpoint, not currently being used, redirects 404.
 */
app.get('/', (req, res) => {
    res.send('ok');
})

/**
 * Simple health api endpoint.
 */
app.get('/api/health', (req, res) => {
    res.send('ok')
})

/**
 * The listener that starts the server.
 */
const server = app.listen(port, () => {
    logger.info(`GDX Agreements Tracker API listening at http://localhost:${port}`)
    logger.debug(process.env.NODE_ENV)
    logger.debug(apiOptions);
});

module.exports = server;
