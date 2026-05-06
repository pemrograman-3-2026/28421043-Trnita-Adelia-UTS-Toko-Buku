import { prisma } from '../lib/prisma.js'

export const getAll = async (req, res) => {
    try {
        const data = await prisma.kategori.findMany({
            include: { books: true }
        })
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getById = async (req, res) => {
    try {
        const id = Number(req.params.id)

        const kategori = await prisma.kategori.findUnique({
            where: { id },
            include: { books: true }
        })

        if (!kategori) {
            return res.status(404).json({ message: 'Kategori tidak ditemukan' })
        }

        res.json(kategori)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const create = async (req, res) => {
    try {
        const { nama, deskripsi } = req.body

        const kategori = await prisma.kategori.create({
            data: { nama, deskripsi }
        })

        res.status(201).json({ message: 'Kategori berhasil ditambahkan', data: kategori })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const update = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const { nama, deskripsi } = req.body

        const kategori = await prisma.kategori.update({
            where: { id },
            data: { nama, deskripsi }
        })

        res.json({ message: 'Kategori berhasil diupdate', data: kategori })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const remove = async (req, res) => {
    try {
        const id = Number(req.params.id)

        await prisma.kategori.delete({ where: { id } })

        res.json({ message: 'Kategori berhasil dihapus' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}