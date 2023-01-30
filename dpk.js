const crypto = require("crypto");

// The original code used multiple nested if statements to determine the partition key. The refactored code replaces these with a more concise and readable approach using ternary operators and helper functions.

// A stringify helper function is created to convert a value to a string, or stringify it if it is not already a string.

// A hash helper function is created to create a hash of a value using the SHA3-512 algorithm.

// The candidate partition key is determined by either the event.partitionKey property if it exists, or the hash of the stringified event if it does not. If event is not defined, the candidate is set to the TRIVIAL_PARTITION_KEY.

// The candidate is returned if its length is less than or equal to the maximum length, otherwise a hash of the candidate is returned.
exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";

  const MAX_PARTITION_KEY_LENGTH = 256;

  // Helper function to stringify a value.
  const stringify = (value) => (typeof value === "string" ? value : JSON.stringify(value));

  // Helper function to create a hash.
  const hash = (value) => crypto.createHash("sha3-512").update(value).digest("hex");

  // Determine the candidate partition key.
  const candidate = event
    ? stringify(event.partitionKey || hash(JSON.stringify(event)))
    : TRIVIAL_PARTITION_KEY;

  // Return the candidate if its length is less than or equal to the maximum length,
  // otherwise return a hash of the candidate.
  return candidate.length <= MAX_PARTITION_KEY_LENGTH
    ? candidate
    : hash(candidate);
};
