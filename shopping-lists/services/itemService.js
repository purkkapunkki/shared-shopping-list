import { sql } from "../database/database.js";

const addItem = async (name, listId) => {
  await sql`INSERT INTO shopping_list_items (name, shopping_list_id) VALUES (${name}, ${listId})`;
};

const findListItems = async (listId) => {
  return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${listId} ORDER BY collected, name`;
};

const getItemCount = async () => {
  const row = (await sql`SELECT COUNT(*) FROM shopping_list_items`)[0];
  return Number(row.count);
};

const collectItem = async (id) => {
  await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${id}`;
};

const uncollectItem = async (id) => {
  await sql`UPDATE shopping_list_items SET collected = false WHERE id = ${id}`;
};

const removeItem = async (id) => {
  await sql`DELETE FROM shopping_list_items WHERE id = ${id}`;
};

export { addItem, findListItems, getItemCount, collectItem, uncollectItem, removeItem };