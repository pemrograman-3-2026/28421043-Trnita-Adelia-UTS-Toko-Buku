import express from 'express'
import * as controller from '../controllers/penerbit.controller.js'

const router = express.Router()

router.get('/view/', controller.getAll)
router.post('/', controller.create)

export default router