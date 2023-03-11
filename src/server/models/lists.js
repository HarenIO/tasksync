import pool from '../config/database.js'

const listsModel = {
  createList: async (data) => {
    try {
      const { name, tracker_id } = data
      const [rows] = await pool.query('INSERT INTO lists (name, tracker_id) VALUES(?, ?)', [name, tracker_id])
      return rows
    } catch (err) {
      console.error(err)
      throw new Error('Failed to edit tracker')
    }
  },
  getListById: async (id) => {
    try {
      const [rows] = await pool.query('SELECT id, name, tracker_id FROM lists WHERE id = ?', [id])
      return rows[0]
    } catch (err) {
      console.error(err)
      throw new Error('Failed to edit tracker')
    }
  }
}

export default listsModel