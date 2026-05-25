import { prisma } from '../lib/prisma.js'
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
    try {
        const { name, username, password } = req.body

        const existingUser = await prisma.user.findUnique({
            where: { username }
        })

        if (existingUser) {
            return res.status(400).json({
                message: "Username sudah digunakan"
            })
        }

        const hash = await bcrypt.hash(password, 10)

        await prisma.user.create({
            data: { name, username, password: hash }
        })

        res.json({
            message: 'Register berhasil'
        })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const getAll = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: { id: true, name: true, username: true }
        })
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getById = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const user = await prisma.user.findUnique({
            where: { id },
            select: { id: true, name: true, username: true, books: true, transactions: true }
        })
        
        if (!user) {
            return res.status(404).json({ message: 'User tidak ditemukan' })
        }
        
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const update = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const { name, username, password } = req.body

        let data = { name, username }

        if (password) {
            const hash = await bcrypt.hash(password, 10)
            data.password = hash
        }

        const user = await prisma.user.update({
            where: { id },
            data
        })

        res.json({ message: 'User diupdate', data: { id: user.id, name: user.name, username: user.username } })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const remove = async (req, res) => {
    try {
        const id = Number(req.params.id)
        await prisma.user.delete({ where: { id } })
        res.json({ message: 'User dihapus' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export const login = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await prisma.user.findUnique({
            where: { username }
        })

        if (!user) {
            return res.status(404).json({
                message: "User tidak ditemukan"
            })
        }

        const valid = await bcrypt.compare(password, user.password)

        if (!valid) {
            return res.status(401).json({
                message: "Password salah"
            })
        }

        res.json({
            message: "Login berhasil"
        })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}