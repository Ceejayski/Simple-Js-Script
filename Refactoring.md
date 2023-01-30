# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

**The original code used multiple nested if statements to determine the partition key. The refactored code replaces these with a more concise and readable approach using ternary operators and helper functions.**

- A stringify helper function is created to convert a value to a string, or stringify it if it is not already a string.

- A hash helper function is created to create a hash of a value using the SHA3-512 algorithm.

- The candidate partition key is determined by either the event.partitionKey property if it exists, or the hash of the stringified event if it does not. If event is not defined, the candidate is set to the TRIVIAL_PARTITION_KEY.

- The candidate is returned if its length is less than or equal to the maximum length, otherwise a hash of the candidate is returned.
