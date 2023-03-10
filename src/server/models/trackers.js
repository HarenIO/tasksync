import pool from '../config/database.js'

const trackersModel = {
  createTracker: async (data) => {
    let conn
    try {
      const { name, user_id } = data
      conn = await pool.getConnection()
      await conn.beginTransaction()
      const result1 = await conn.query('INSERT INTO trackers (name, owner_id) VALUES(?, ?)', [name, user_id])
      const tracker_id = result1[0].insertId
      const result2 = await conn.query('INSERT INTO tracker_users (tracker_id, user_id) VALUES(?, ?)', [tracker_id, user_id])
      await conn.commit()
      return (result1[0])
    } catch (err) {
      console.error(err)
      await conn.rollback()
      throw new Error('Failed to create tracker')
    } finally {
      if (conn) {
        conn.release()
      }
    }
  },
  editTracker: async (data) => {
    try {
      const {new_tracker_name, tracker_id, user_id} = data
      const result = await pool.query('UPDATE trackers SET name = ? WHERE id = ? AND owner_id = ?', [new_tracker_name, tracker_id, user_id])
      return result[0]
    } catch (err) {
      console.error(err)
      throw new Error('Failed to edit tracker')
    }
  },
  deleteTracker: async (data) => {
    try {
      const {id, user_id} = data
      const result = await pool.query('DELETE FROM trackers WHERE id = ? AND owner_id = ?', [id, user_id])
      return result[0]
    } catch (err) {
      console.error(err)
      throw new Error('Failed to edit tracker')
    }
  },
  getTrackerById: async (data) => {
    try {
      const {id, user_id} = data
      const [rows] = await pool.query('SELECT id, name, owner_id FROM trackers WHERE id = ? AND owner_id = ?', [id, user_id])
      return rows[0]
    } catch (err) {
      console.error(err)
      throw new Error('Failed to edit tracker')
    }
  },
  addUserToTracker: async (data) => {
    try {
      const { tracker_id, user_id, owner_id } = data
      const [rows] = await pool.query(`
        INSERT INTO tracker_users (tracker_id, user_id)
        SELECT ?, ?
        FROM trackers
        WHERE id = ? AND owner_id = ?
      `, [tracker_id, user_id, tracker_id, owner_id])
      return rows[0]
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return {error: 'User already exists on the tracker'}
      } else {
        return {error: 'Failed to add user to the tracker'}
      }
    }
  }
}

export default trackersModel