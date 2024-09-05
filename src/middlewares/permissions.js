"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// AUTHORIZATION

module.exports = {

    isLogin: (req, res, next) => {
        
// next()
        

        if (req.user && req.user.isActive) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('You must login first.')
        }
    },

    isAdmin: (req, res, next) => {

        // next()

        if (req.user && req.user.isActive && req.user.isAdmin) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error(' You must login and must be admin.')
        }
    },

    isStaff: (req, res, next) => {

        // next()

        if (req.user && req.user.isActive &&( req.user.isAdmin || req.user.isStaff)) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error(' You must login and must be admin.')
        }
    }
}