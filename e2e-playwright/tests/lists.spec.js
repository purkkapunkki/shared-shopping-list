const { test, expect } = require("@playwright/test");

const createList = async (page, listName) => {
  await page.goto("/lists");
  await page.getByRole("textbox", { name: "Name:" }).fill(listName);
  await page.getByRole("button", { name: "Add" }).click();
};

const createListItem = async (page, listName, itemName) => {
  await page.goto("/lists");
  await page.getByRole("link", { name: listName }).click();;
  await page.getByRole("textbox", { name: "Name:" }).fill(itemName);
  await page.getByRole("button", { name: "Add" }).click();
};

test("List should be shown after creation", async ({ page }) => {
  const listName = "List for creation";
  await createList(page, listName);
  const content = await page.content();
  await expect(content).toContain(listName);
});

test("List should be hidden after deactivation", async ({ page }) => {
  const listName = "List for deactivation";
  await createList(page, listName);
  const list = await page.getByRole('listitem').filter({ hasText: listName });
  await list.getByRole("button", { name: "Deactivate list!" }).click();
  const content = await page.content();
  await expect(content).not.toContain(listName);
});

test("List item should not be visible after deletion", async ({ page }) => {
  const listName = "List for removing an item";
  await createList(page, listName);
  const itemName = "Item for removal";
  await createListItem(page, listName, itemName);
  await page.getByRole("button", { name: "Delete" }).click();
  const content = await page.content();
  await expect(content).not.toContain(itemName);
});

test("Uncollect link should be shown after marking a list item as collected", async ({ page }) => {
  const listName = "List for marking an item as collected";
  await createList(page, listName);
  const itemName = "Item for marking as collected";
  await createListItem(page, listName, itemName);
  await page.getByRole("button", { name: "Mark collected!" }).click();
  const content = await page.content();
  await expect(content).toContain("Uncollect");
});

test("Collect link should be shown after marking a list item as uncollected", async ({ page }) => {
  const listName = "List for marking an item as uncollected";
  await createList(page, listName);
  const itemName = "Item for marking as uncollected";
  await createListItem(page, listName, itemName);
  await page.getByRole("button", { name: "Mark collected!" }).click();
  await page.getByRole("button", { name: "Uncollect" }).click();
  const content = await page.content();
  await expect(content).toContain("Mark collected!");
});
