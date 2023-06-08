import { env } from "@/env.mjs"
import { connect } from "@planetscale/database"
import { drizzle } from "drizzle-orm/planetscale-serverless"

import schema from "./schema"

// create database connection
const connection = connect({
  url: env.DB_URL,
})

export const db = drizzle(connection, { schema })
