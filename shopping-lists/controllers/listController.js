import * as listService from "../services/listService.js";
import * as itemService from "../services/itemService.js";
import * as utilities from "../utilities.js";

const addList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await listService.create(name);

  return utilities.redirectTo("/lists");
};

const viewLists = async (request) => {
  const data = {
    lists: await listService.findAllActiveLists(),
  };

  return utilities.render("lists.eta", data);
};

const viewList = async (request) => {
  const url = new URL(request.url);
  const regex = /\/lists\/(?<listId>[0-9]+)/;
  const matches = url.pathname.match(regex);
  const listId = matches.groups.listId;

  const list = await listService.getList(listId);
  const items = await itemService.findListItems(listId);

  const data = { items: items, list: list };
  return utilities.render("list.eta", data);
};

const deleteList = async (request) => {
  const url = new URL(request.url);
  const regex = /\/lists\/(?<listId>[0-9]+)\/deactivate/;
  const matches = url.pathname.match(regex);
  const listId = matches.groups.listId;

  await listService.removeList(listId);
  return utilities.redirectTo("/lists");
};

export { addList, viewLists, viewList, deleteList };