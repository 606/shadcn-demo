---
title: API Reference
description: Complete API reference
---

# API Reference

## Core Methods

### initialize(config)

Initialize Avro with configuration.

```javascript
avro.initialize({
  name: 'MyApp'
});
```

**Parameters:**
- `config` (object): Configuration object

**Returns:** Promise<void>

### connect()

Establish a connection.

```javascript
await avro.connect();
```

**Returns:** Promise<void>

### disconnect()

Close the connection.

```javascript
await avro.disconnect();
```

**Returns:** Promise<void>

## Events

Listen to various events:

```javascript
avro.on('connected', () => {
  console.log('Connected!');
});

avro.on('error', (error) => {
  console.error('Error:', error);
});
```
