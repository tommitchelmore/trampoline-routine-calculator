import argon2 from 'argon2'
import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth2'
import uid from 'uid-safe'
import { pool } from '../../database'
import generateTimestamp from '../../database/util/generateTimestamp'

export default {
  register: async (req, res) => {
    const { email, name, password } = req.body
    console.log(email, name, password)

    const [users] = await pool.query('SELECT * FROM user WHERE email = ?', [email])

    if (users.length > 0) {
      return res.status(400).json({
        message: 'The email is already in use'
      })
    }

    const newUser = {
        id: await uid(24),
        email,
        name,
        password: await argon2.hash(password),
        created_at: generateTimestamp()
    }

    await pool.query('INSERT INTO user SET ?', [newUser])
    const [rows] = await pool.query('SELECT id, email, name, role FROM user WHERE email = ?', [email])
    req.session.user = users[0]
    return res.status(200).json(
        {
            message: 'User created successfully',
            user: rows[0]
        }
    )
  },
  signIn: async (req, res) => {
    const { email, password } = req.body
    const [users] = await pool.query('SELECT * FROM user WHERE email = ?', [email])

    if (users.length === 0) {
      return res.status(400).json({
        message: 'The email or password is incorrect'
      })
    }

    const user = users[0]

    const passwordOk = await argon2.verify(user.password, password)

    if (!passwordOk) {
      return res.status(400).json({
        message: 'The email or password is incorrect'
      })
    }

    delete user.password
    delete user.created_at

    req.session.user = users[0]
    return res.status(200).json({
      message: 'User logged in successfully',
      user: users[0]
    })
  },
  signOut: async (req, res) => {
    if (!req.session || !req.session.user) return res.status(400).json({ message: 'Not logged in' })
    await req.session.destroy()
    res.status(200).json({ message: 'User logged out successfully' })
  },
  deleteAccount: async (req, res) => {
    if (!req.session || !req.session.user) return res.status(400).json({ message: 'Not logged in' })
    try {
        await pool.query('DELETE FROM user WHERE id = ?', [req.session.user.id])
        await req.session.destroy()
    } catch(e) {
        return res.status(400).json({ message: 'Error deleting user' })
    }
    return res.status(200).json({ message: 'User deleted successfully' })
  }
}