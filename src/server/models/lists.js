import pool from '../config/database.js'

const listsModel = {
  createList: async (data) => {
    try {
      const { name, tracker_id } = data
      const [rows] = await pool.query('INSERT INTO lists (name, tracker_id) VALUES(?, ?)', [name, tracker_id])
      return rows
    } catch (err) {
      console.error(err)
      throw new Error('Failed to create list')
    }
  },
  getListById: async (id) => {
    try {
      const [rows] = await pool.query('SELECT id, name, tracker_id FROM lists WHERE id = ?', [id])
      return rows[0]
    } catch (err) {
      console.error(err)
      throw new Error('Failed to get list')
    }
  },
  editList: async (data) => {
    const {new_name, list_id} = data
    try {
      const [rows] = await pool.query('UPDATE lists SET name = ? WHERE id = ?', [new_name, list_id])
      return rows
    } catch (err) {
      console.error(err)
      throw new Error('Failed to edit list')
    }
  },
  deleteList: async (id) => {
    try {
      const result = await pool.query('DELETE FROM lists WHERE id = ?', [id])
      return result
    } catch (err) {
      console.error(err)
      throw new Error('Failed to delete list')
    }
  },
  getAllItemsOfList: async (id) => {
    try {
      const [rows] = await pool.query('SELECT id, title, content FROM items WHERE list_id = ?', [id])
      return rows
    } catch (err) {
      console.error(err)
      throw new Error('Failed to get items')
    }
  }
}

export default listsModel