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
      const { new_tracker_name, tracker_id, user_id } = data
      const result = await pool.query('UPDATE trackers SET name = ? WHERE id = ? AND owner_id = ?', [new_tracker_name, tracker_id, user_id])
      return result[0]
    } catch (err) {
      console.error(err)
      throw new Error('Failed to edit tracker')
    }
  },
  deleteTracker: async (data) => {
    try {
      const { id, user_id } = data;
      const permissionCheck = await pool.query('SELECT owner_id FROM trackers WHERE id = ?', [id]);
      if (permissionCheck[0].length === 0 || permissionCheck[0][0].owner_id !== user_id) {
        return { error: 'You dont have the required permission to delete that tracker', status: 403 };
      }
      const lists = await pool.query('SELECT id FROM lists WHERE tracker_id = ?', [id]);
      for (const list of lists[0]) {
        await pool.query('DELETE FROM items WHERE list_id = ?', [list.id]);
      }
      await pool.query('DELETE FROM lists WHERE tracker_id = ?', [id]);
      await pool.query('DELETE FROM tracker_users WHERE tracker_id = ?', [id]);
      const result = await pool.query('DELETE FROM trackers WHERE id = ? AND owner_id = ?', [id, user_id]);
      return result[0];
    } catch (err) {
      throw new Error('Failed to delete tracker');
    }
  }
  ,
  getTrackerById: async (data) => {
    try {
      const { id, authedUser } = data;
      const [rows] = await pool.query(
        `
        SELECT t.id, t.name, t.owner_id
        FROM trackers t
        INNER JOIN tracker_users tu ON t.id = tu.tracker_id
        WHERE t.id = ? AND (t.owner_id = ? OR tu.user_id = ?)
        `,
        [id, authedUser, authedUser]
      );
      return rows[0];
    } catch (err) {
      console.error(err);
      throw new Error("Failed to get tracker");
    }
  },
  addUserToTracker: async (data) => {
    try {
      const { tracker_id, username, reqUser } = data;
      const [rows] = await pool.query(`
        INSERT INTO tracker_users (tracker_id, user_id)
        SELECT ?, users.id
        FROM users, trackers
        WHERE users.username = ? AND trackers.id = ? AND trackers.owner_id = ?
      `, [tracker_id, username, tracker_id, reqUser]);
      return rows;
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return { error: 'User already exists on the tracker' };
      } else {
        return { error: 'Failed to add user to the tracker' };
      }
    }
  },
  getUsersOfTracker: async (data) => {
    try {
      const { id, user_id } = data
      const [rows] = await pool.query(`SELECT u.id as user_id, u.username, tu.tracker_id
      FROM tracker_users tu 
      INNER JOIN users u ON tu.user_id = u.id 
      WHERE tu.tracker_id = ?
      AND EXISTS (
          SELECT 1
          FROM tracker_users tu2
          WHERE tu2.tracker_id = ?
          AND tu2.user_id = ?
      )
      `, [id, id, user_id])
      return rows
    } catch (err) {
      console.error(err)
      throw new Error('Failed to get users of tracker')
    }
  },

  removeUserFromTracker: async (data) => {
    try {
      const { id, userId } = data
      const result = await pool.query('DELETE FROM tracker_users WHERE tracker_id = ? AND user_id = ?', [id, userId])
      return result[0]
    } catch (err) {
      console.error(err)
      throw new Error('Failed to edit tracker')
    }
  },

  getListsOfTracker: async (id) => {
    try {
      const [rows] = await pool.query('SELECT id, name FROM lists WHERE tracker_id = ?', [id])
      return rows
    } catch (err) {
      console.error(err)
      throw new Error('Failed to edit tracker')
    }
  }
}

export default trackersModel