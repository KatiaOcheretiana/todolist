describe("App", () => {
  it("base TaskItem example, visually looks correct", async () => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=taskitem-component--task-item-base-example"
    );
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });
});
