const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });


  it("returns the partition key if it exists", () => {
    expect(deterministicPartitionKey({ partitionKey: "some-key" })).toBe("some-key");
  });

  it("returns a hash of the event if partition key is not present", () => {
    expect(deterministicPartitionKey({ foo: "bar" })).toMatch(/^[a-f0-9]+$/);
  });

  it("returns the hash of JSON.stringify(event) when event.partitionKey is null or undefined", () => {
    const event = { foo: "bar" };
    const data = JSON.stringify(event);
    const expected = crypto.createHash("sha3-512").update(data).digest("hex");
    expect(deterministicPartitionKey(event)).toBe(expected);
  });

  it("returns a hash if candidate length is greater than MAX_PARTITION_KEY_LENGTH", () => {
    expect(deterministicPartitionKey({ partitionKey: "a".repeat(257) })).toMatch(/^[a-f0-9]+$/);
  });

  it("returns candidate as is when it is of length equal to or less than MAX_PARTITION_KEY_LENGTH", () => {
    const event = { partitionKey: "abc" };
    expect(deterministicPartitionKey(event)).toBe(event.partitionKey);
  });
});
