import { configure, serve } from "./deps.js";
import * as listController from "./controllers/listController.js";
import * as itemController from "./controllers/itemController.js";
import * as mainController from "./controllers/mainController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;
  if (path.match("^/$") && method === "GET") {
    return mainController.mainPage(request);
  } else if (path.match("^/lists$") && method === "GET") {
    return listController.viewLists(request);
  } else if (path.match("^/lists/[0-9]+$") && method === "GET") {
    return listController.viewList(request);
  } else if (path.match("^/lists$") && method === "POST") {
    return listController.addList(request);
  } else if (path.match("^/lists/[0-9]+/deactivate$") && method === "POST") {
    return listController.deleteList(request);
  } else if (path.match("^/lists/[0-9]+/items$") && method === "POST") {
    return itemController.addItem(request);
  } else if (path.match("^/lists/[0-9]+/items/[0-9]+/delete$") && method === "POST") {
    return itemController.deleteItem(request);
  } else if (path.match("^/lists/[0-9]+/items/[0-9]+/collect$") && method === "POST") {
    return itemController.collectItem(request);
  } else if (path.match("^/lists/[0-9]+/items/[0-9]+/uncollect$") && method === "POST") {
    return itemController.uncollectItem(request);
  }
  return new Response("", { status: 404 });
};

serve(handleRequest, { port: 7777 });
