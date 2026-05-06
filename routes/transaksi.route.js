import express from 'express'
import * as controller from '../controllers/transaksi.controller.js'

const router = express.Router()

router.get('/', controller.getAll)
router.get('/id/:id', controller.getById)
router.post('/', controller.create)
router.delete('/delete/:id', controller.remove)

export default router