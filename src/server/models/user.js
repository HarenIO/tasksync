import pool from '../config/database.js'

const userModel = {
  getAllTrackersOfUser: async (id) => {
    try {
      const [rows] = await pool.query(`
        SELECT tu.id, tu.tracker_id, tu.user_id, t.name
        FROM tracker_users tu
        JOIN trackers t ON tu.tracker_id = t.id
        WHERE tu.user_id = ?
      `, [id]);
      return rows;
    } catch (err) {
      throw new Error('Failed to edit tracker');
    }
  }
}

export default userModel