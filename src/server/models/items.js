import pool from '../config/database.js'

const itemsModel = {
  createItem: async (data) => {
    try {
      const {title, list_id} = data
      const [rows] = await pool.query('INSERT INTO items (title, list_id) VALUES(?, ?)', [title, list_id])
      return rows
    } catch (err) {
      console.error(err)
      throw new Error('Failed to create list')
    }
  },
  getItemById: async (id) => {
    /* try {
      const [rows] = await pool.query('SELECT id, name, tracker_id FROM lists WHERE id = ?', [id])
      return rows[0]
    } catch (err) {
      console.error(err)
      throw new Error('Failed to get list')
    } */
  },
  editItem: async (data) => {
    /* const {new_name, list_id} = data
    try {
      const [rows] = await pool.query('UPDATE lists SET name = ? WHERE id = ?', [new_name, list_id])
      return rows
    } catch (err) {
      console.error(err)
      throw new Error('Failed to edit list')
    } */
  },
  deleteItem: async (id) => {
    /* try {
      const result = await pool.query('DELETE FROM lists WHERE id = ?', [id])
      return result
    } catch (err) {
      console.error(err)
      throw new Error('Failed to edit tracker')
    } */
  }
}

export default itemsModel