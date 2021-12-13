import assert from "assert"
import { pool } from "../database"

export default {
  getSelf: async (req, res) => {
    if (!req.session.user) return res.status(401).send({ error: "Unauthorized" })
    const [rows] = await pool.query("SELECT * FROM user WHERE id = ?", [req.session.user.id])
    return res.status(200).json({user: rows[0]})
  },
  read: async (req, res) => {
    if (req.body.id) {
      const [rows] = await pool.query("SELECT * FROM user WHERE id = ?", [req.body.id])
      return res.status(200).json({'user': rows[0]})
    }
    if (req.body.ids && req.body.ids.length > 0) {
      const [rows] = await pool.query("SELECT * FROM user WHERE id IN (?)", [req.body.ids])
      return res.status(200).json({'users': rows})
    }
    const [rows] = await pool.query("SELECT * FROM user")
    return res.status(200).json({'users': rows})
  },
  update: async (req, res) => {
    const { id, name, email, role } = req.body

    try {
      assert(id, "id is required")
      assert(name, "updated name is required")
      assert(email, "updated email is required")
      assert(role, "updated role is required")
      assert(['admin','contributor','user'].includes(role), "role must be one of 'admin', 'contributor', 'user'")
    } catch (err) {
      return res.status(400).json({'message': err.message})
    }

    try {
      const [rows] = await pool.query("UPDATE user SET name = ?, email = ?, role = ? WHERE id = ?", [name, email, role, id])
      return res.status(200).json({'message': 'User updated successfully'})
    } catch (err) {
      return res.status(500).json({'message': err.message})
    }
  }
}