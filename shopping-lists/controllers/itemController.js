import * as itemService from "../services/itemService.js";
import * as utilities from "../utilities.js";

const addItem = async (request) => {
  const url = new URL(request.url);
  const regex = /\/lists\/(?<listId>[0-9]+)\/items/;
  const matches = url.pathname.match(regex);
  const listId = matches.groups.listId;

  const formData = await request.formData();
  const name = formData.get("name");

  await itemService.addItem(name, listId);

  return utilities.redirectTo(`/lists/${listId}`);
};

const collectItem = async (request) => {
  const url = new URL(request.url);
  const regex = /\/lists\/(?<listId>[0-9]+)\/items\/(?<itemId>[0-9]+)\/collect/;
  const matches = url.pathname.match(regex);
  const listId = matches.groups.listId;
  const itemId = matches.groups.itemId;

  await itemService.collectItem(itemId);

  return utilities.redirectTo(`/lists/${listId}`);
};

const uncollectItem = async (request) => {
  const url = new URL(request.url);
  const regex = /\/lists\/(?<listId>[0-9]+)\/items\/(?<itemId>[0-9]+)\/uncollect/;
  const matches = url.pathname.match(regex);
  const listId = matches.groups.listId;
  const itemId = matches.groups.itemId;

  await itemService.uncollectItem(itemId);

  return utilities.redirectTo(`/lists/${listId}`);
};

const deleteItem = async (request) => {
  const url = new URL(request.url);
  const regex = /\/lists\/(?<listId>[0-9]+)\/items\/(?<itemId>[0-9]+)\/delete/;
  const matches = url.pathname.match(regex);
  const listId = matches.groups.listId;
  const itemId = matches.groups.itemId;

  await itemService.removeItem(itemId);

  return utilities.redirectTo(`/lists/${listId}`);
};

export { addItem, collectItem, deleteItem, uncollectItem };