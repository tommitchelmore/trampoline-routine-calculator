import bcrypt from 'bcrypt';
import uid from 'uid-safe'
import { pool } from '../database'
import generateTimestamp from '../database/util/generateTimestamp'
import emailController from './emailController'

export default {
  register: async (req, res) => {
    const { email, name, password } = req.body
    console.log('[AUTH] Registering user:', email)

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
      password: await bcrypt.hash(password, 10),
      created_at: generateTimestamp()
    }

    req.session.userToCreate = newUser
    req.session.expectedCode = [...Array(6)].map(() => Math.floor(Math.random() * 10)).join('')

    console.log('[AUTH] Sending confirmation email to:', email)
    await emailController.confirmationEmail(newUser.name, newUser.email, req.session.expectedCode)

    return res.status(200).json(
      {
        message: 'Waiting on email confirmation',
      }
    )
  },
  confirmEmail: async (req, res) => {
    const { code } = req.body
    console.log('[AUTH] Confirming email:', code)

    if (code !== req.session.expectedCode) return res.status(400).json({message: 'Invalid code'})

    await pool.query('INSERT INTO user SET ?', [req.session.userToCreate])
    const [rows] = await pool.query('SELECT id, email, name, role FROM user WHERE email = ?', [req.session.userToCreate.email])

    req.session.expectedCode = null
    req.session.userToCreate = null
    req.session.user = rows[0]

    return res.status(200).json({
      message: 'Email confirmed',
      user: rows[0]
    })
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

    const passwordOk = await bcrypt.compare(password, user.password)

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