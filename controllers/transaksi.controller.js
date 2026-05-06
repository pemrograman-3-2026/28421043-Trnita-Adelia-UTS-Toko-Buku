import { prisma } from '../lib/prisma.js'

export const getAll = async (req, res) => {
    try {
        const data = await prisma.transaction.findMany({
            include: {
                user: true,
                book: true
            }
        })
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getById = async (req, res) => {
    try {
        const id = Number(req.params.id)

        const transaksi = await prisma.transaction.findUnique({
            where: { id },
            include: {
                user: true,
                book: true
            }
        })

        if (!transaksi) {
            return res.status(404).json({ message: 'Transaksi tidak ditemukan' })
        }

        res.json(transaksi)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const create = async (req, res) => {
    try {
        const { userId, bookId, qty } = req.body

        const book = await prisma.book.findUnique({
            where: { id: bookId }
        })

        if (!book) {
            return res.status(404).json({ message: 'Buku tidak ditemukan' })
        }

        const total = book.price * qty

        const transaksi = await prisma.transaction.create({
            data: { userId, bookId, qty, total }
        })

        res.status(201).json({ message: 'Transaksi berhasil', data: transaksi })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const remove = async (req, res) => {
    try {
        const id = Number(req.params.id)

        await prisma.transaction.delete({ where: { id } })

        res.json({ message: 'Transaksi dihapus' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}