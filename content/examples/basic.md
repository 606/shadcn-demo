---
title: Basic Example
description: A basic example to get started
---

# Basic Example

Here's a simple example to get you started with Avro.

## Simple Usage

```javascript
const avro = require('avro');

async function main() {
  // Initialize Avro
  await avro.initialize({
    name: 'MyApp',
    debug: true
  });

  // Connect
  await avro.connect();

  // Do something
  console.log('Connected successfully!');

  // Disconnect
  await avro.disconnect();
}

main().catch(console.error);
```

## With Error Handling

```javascript
const avro = require('avro');

async function main() {
  try {
    await avro.initialize({
      name: 'MyApp'
    });

    await avro.connect();

    console.log('Connected!');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await avro.disconnect();
  }
}

main();
```
