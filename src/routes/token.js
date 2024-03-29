"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | MIDNIGHT CODERS HOTEL API
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// Token Routes:

const token = require('../controllers/token')


router.route('/')
    .get(token.list)
    .post(token.create)

router.route('/:id')
    .get(token.read)
    .put(token.update)
    .patch(token.update)
    .delete(token.delete)

/* ------------------------------------------------------- */
module.exports = router