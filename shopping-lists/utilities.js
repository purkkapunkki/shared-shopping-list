import { renderFile } from "./deps.js";

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};

const render = async (file, data) => {
  const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  };

  return new Response(await renderFile(file, data), responseDetails);
};

export { redirectTo, render };