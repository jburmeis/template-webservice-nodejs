import DemoService from "../../src/services/DemoService";

describe("Demo service", () => {
  const messages = ["Message 1", "Message 2"];
  const testInstance = new DemoService(messages);

  it("should return an array of predefined strings with given length", async () => {
    const numElements = 2;
    const testResult = testInstance.getRandomMessages(numElements);

    expect(testResult).toHaveLength(numElements);
    for (let i = 0; i < numElements; i++) {
      expect(messages.includes(testResult[i]));
    }
  });
});
