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
    try {
      const [rows] = await pool.query('SELECT id, title, content, list_id FROM items WHERE id = ?', [id])
      return rows[0]
    } catch (err) {
      console.error(err)
      throw new Error('Failed to get list')
    }
  },
  getListId: async (id) => {
    try {
      const [rows] = await pool.query('SELECT list_id FROM items WHERE id = ?', [id])
      return rows[0]
    } catch (err) {
      console.error(err)
      throw new Error('Failed to get list id')
    }
  },
  editItem: async (data) => {
    const {id, title, content} = data
    try {
      const [rows] = await pool.query('UPDATE items SET title = ?, content = ? WHERE id = ?', [title, content, id])
      return rows
    } catch (err) {
      console.error(err)
      throw new Error('Failed to edit item')
    }
  },
  deleteItem: async (id) => {
    try {
      const result = await pool.query('DELETE FROM items WHERE id = ?', [id])
      return result
    } catch (err) {
      console.error(err)
      throw new Error('Failed to delete item')
    }
  }
}

export default itemsModel