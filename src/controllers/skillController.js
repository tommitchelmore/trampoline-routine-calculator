import uid from "uid-safe"
import assert from "assert"
import { pool } from "../../database"
import generateTimestamp from "../../database/util/generateTimestamp"

export default {
  create: async (req, res) => {
    const { name, description, difficulty, fig_shorthand, start_position, end_position } = req.body

    try {
      assert(name, "Missing field: name")
      assert(description, "Missing field: description")
      assert(difficulty, "Missing field: difficulty")
      assert(fig_shorthand, "Missing field: fig_shorthand")
      assert(start_position, "Missing field: start_position")
      assert(end_position, "Missing field: end_position")
    } catch (err) {
      return res.status(400).json({ 'message': err.message })
    }
    
    const timestamp = generateTimestamp()
    const newSkill = {
      id: await uid(24),
      name,
      description,
      difficulty,
      fig_shorthand,
      start_position,
      end_position,
      created_by: req.session.user.email,
      updated_by: req.session.user.email,
      created_at: timestamp,
      updated_at: timestamp
    }

    try {
      await pool.query("INSERT INTO skill SET ?", [newSkill])
    } catch (error) {
      return res.status(500).json({'message': 'Internal server error: ' + error.message})
    }

    return res.status(200).json({'message': 'Skill created successfully', 'skill': newSkill})
  },
  read: async (req, res) => {
    if (req.body.id) {
      const [rows] = await pool.query("SELECT * FROM skill WHERE id = ?", [req.body.id])
      return res.status(200).json({'skill': rows[0]})
    }
    if (req.body.ids && req.body.ids.length > 0) {
      const [rows] = await pool.query("SELECT * FROM skill WHERE id IN (?)", [req.body.ids])
      return res.status(200).json({'skills': rows})
    }
    const [rows] = await pool.query("SELECT * FROM skill")
    return res.status(200).json({'skills': rows})
  },
  update: async (req, res) => {
    const { id, newSkill } = req.body
    try {
      assert(id, "Missing field: id")
      assert(newSkill, "Missing field: newSkill")
    } catch (err) {
      return res.status(400).json({ 'message': err.message })
    }
    const { name, description, difficulty, fig_shorthand, start_position, end_position } = newSkill
    try {
      assert(name, "Missing field: newSkill.name")
      assert(description, "Missing field: newSkill.description")
      assert(difficulty || !isNaN(difficulty), "Missing field: newSkill.difficulty")
      assert(fig_shorthand, "Missing field: newSkill.fig_shorthand")
      assert(start_position, "Missing field: newSkill.start_position")
      assert(end_position, "Missing field: newSkill.end_position")
    } catch (err) {
      return res.status(400).json({ 'message': err.message })
    }

    try {
      await pool.query("UPDATE skill SET name = ?, description = ?, difficulty = ?, fig_shorthand = ?, start_position = ?, end_position = ?, updated_by = ?, updated_at = ? WHERE id = ?", [name, description, difficulty, fig_shorthand, start_position, end_position, req.session.user.email, generateTimestamp(), id])
      const [rows] = await pool.query("SELECT * FROM skill WHERE id = ?", [id])
      return res.status(200).json({'message': 'Skill updated successfully', 'skill': rows[0]})
    } catch (error) {
      return res.status(500).json({'message': 'Internal server error: ' + error.message})
    }
  },
  delete: async (req, res) => {
    const { id } = req.body
    
    try {
      assert(id, "Missing field: id")
    } catch (err) {
      return res.status(400).json({ 'message': err.message })
    }

    try {
      await pool.query("DELETE FROM skill WHERE id = ?", [id])
      return res.status(200).json({'message': 'Skill deleted successfully'})
    } catch (error) {
      return res.status(500).json({'message': 'Internal server error: ' + error.message})
    }
  }
}