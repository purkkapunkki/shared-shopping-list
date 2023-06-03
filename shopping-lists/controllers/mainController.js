import * as itemService from "../services/itemService.js";
import * as listService from "../services/listService.js";
import * as utilities from "../utilities.js";

const mainPage = async (request) => {
  const shoppingListCount = await listService.getListCount();
  const shoppingListItemCount = await itemService.getItemCount();
  const data = {
    shoppingListCount: shoppingListCount,
    shoppingListItemCount: shoppingListItemCount
  };
  return utilities.render("main.eta", data);
};

export { mainPage };