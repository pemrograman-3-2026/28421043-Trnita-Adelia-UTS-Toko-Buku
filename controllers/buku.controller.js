import { prisma } from '../lib/prisma.js'

export const getAll = async (req, res) => {
    try {
        const data = await prisma.book.findMany({
            include: {
                kategori: true,
                penerbit: true,
                user: true
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

        const book = await prisma.book.findUnique({
            where: { id },
            include: {
                kategori: true,
                penerbit: true,
                user: true
            }
        })

        if (!book) {
            return res.status(404).json({ message: 'Buku tidak ditemukan' })
        }

        res.json(book)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const create = async (req, res) => {
    try {
        const { title, author, price, stock, userId, kategoriId, penerbitId } = req.body

        const book = await prisma.book.create({
            data: { title, author, price, stock, userId, kategoriId, penerbitId }
        })

        res.status(201).json({ message: 'Buku berhasil ditambahkan', data: book })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const update = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const { title, author, price, stock, userId, kategoriId, penerbitId } = req.body

        const book = await prisma.book.update({
            where: { id },
            data: { title, author, price, stock, userId, kategoriId, penerbitId }
        })

        res.json({ message: 'Buku berhasil diupdate', data: book })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const remove = async (req, res) => {
    try {
        const id = Number(req.params.id)

        await prisma.book.delete({ where: { id } })

        res.json({ message: 'Buku berhasil dihapus' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}