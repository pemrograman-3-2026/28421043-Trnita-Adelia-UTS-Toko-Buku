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