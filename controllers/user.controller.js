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