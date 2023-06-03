import { sql } from "../database/database.js";

const create = async (name) => {
  await sql`INSERT INTO shopping_lists (name) VALUES (${name})`;
};

const findAllActiveLists = async () => {
  return await sql`SELECT * FROM shopping_lists WHERE active = true`;
};

const getList = async (id) => {
  return (await sql`SELECT * FROM shopping_lists WHERE id = ${id}`)[0];
};

const getListCount = async () => {
  const row = (await sql`SELECT COUNT(*) FROM shopping_lists`)[0];
  return Number(row.count);
};

const removeList = async (id) => {
  await sql`UPDATE shopping_lists SET active = false WHERE id = ${id}`;
};

export { create, findAllActiveLists, getList, getListCount, removeList };