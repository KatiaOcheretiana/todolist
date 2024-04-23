describe("addItemForm", () => {
  it("base addItemForm example, visually looks correct", async () => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=additemform-component--add-item-form-base-example"
    );
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });
});
