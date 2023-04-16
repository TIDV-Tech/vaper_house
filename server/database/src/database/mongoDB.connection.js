import { connect } from "mongoose"

(async function () {
  try {
    const db = await connect(process.env.DB_URL)
    console.log(`Connected to ${db.connection.name}`)
  } catch (error) {
    console.error(error)
  }
})()