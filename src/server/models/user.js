import pool from '../config/database.js'

const userModel = {
  getUserById: async (id) => {
      const [rows] = await pool.query('SELECT id, username, role FROM users WHERE id = ?', [id])
      return rows[0]
  },
  getAllTrackersOfUser: async (id) => {
    try {
      const [rows] = await pool.query('SELECT id, tracker_id, user_id FROM tracker_users WHERE user_id = ?', [id])
      return rows
    } catch (err) {
      console.error(err)
      throw new Error('Failed to edit tracker')
    }
  }
}

export default userModel