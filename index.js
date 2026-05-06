import express from 'express'
import userRoute from './routes/user.route.js'
import kategoriRoute from './routes/kategori.route.js'
import penerbitRoute from './routes/penerbit.route.js'
import bukuRoute from './routes/buku.route.js'
import transactionRoute from './routes/transaksi.route.js'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Toko Buku API berjalan!')
})

app.use('/api/user', userRoute)
app.use('/api/kategori', kategoriRoute)
app.use('/api/penerbit', penerbitRoute)
app.use('/api/buku', bukuRoute)
app.use('/api/transaction', transactionRoute)

app.listen(3000, () => {
    console.log('Server Started')
})