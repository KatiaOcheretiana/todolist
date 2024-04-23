describe("addItemForm", () => {
  it("base addItemForm example, visually looks correct", async () => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=additemform-component--add-item-form-base-example"
    );
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });

  it("base App example, visually looks correct", async () => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=app-component--app-base-example"
    );
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });

  it("base EditableSpan example, visually looks correct", async () => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=editablespan-component--editable-span-base-example"
    );
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });

  it("base TaskItem example, visually looks correct", async () => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=taskitem-component--task-item-base-example"
    );
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });
});
