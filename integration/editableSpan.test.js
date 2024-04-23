describe("editableSpan", () => {
  it("base EditableSpan example, visually looks correct", async () => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=editablespan-component--editable-span-base-example"
    );
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });
});
