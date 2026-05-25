import { prisma } from '../lib/prisma.js'

export const getAll = async (req, res) => {
    try {
        const data = await prisma.penerbit.findMany()
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const create = async (req, res) => {
    try {
        const { nama, alamat } = req.body

        const penerbit = await prisma.penerbit.create({
            data: { nama, alamat }
        })

        res.status(201).json({ message: 'Penerbit berhasil ditambahkan', data: penerbit })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getById = async (req, res) => {
    try {
        const id = Number(req.params.id)

        const penerbit = await prisma.penerbit.findUnique({
            where: { id },
            include: { books: true }
        })

        if (!penerbit) {
            return res.status(404).json({ message: 'Penerbit tidak ditemukan' })
        }

        res.json(penerbit)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const update = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const { nama, alamat } = req.body

        const penerbit = await prisma.penerbit.update({
            where: { id },
            data: { nama, alamat }
        })

        res.json({ message: 'Penerbit berhasil diupdate', data: penerbit })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const remove = async (req, res) => {
    try {
        const id = Number(req.params.id)

        await prisma.penerbit.delete({ where: { id } })

        res.json({ message: 'Penerbit berhasil dihapus' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}