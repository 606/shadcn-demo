---
title: Database Integration
description: Integrating Avro with databases
---

# Database Integration

Connect Avro to various databases for data persistence.

## Supported Databases

- PostgreSQL
- MySQL
- MongoDB
- SQLite
- Redis

## PostgreSQL Setup

```javascript
const avro = require('avro');

await avro.database.connect({
  type: 'postgresql',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'secret',
  database: 'myapp'
});
```

## MongoDB Setup

```javascript
await avro.database.connect({
  type: 'mongodb',
  url: 'mongodb://localhost:27017/myapp'
});
```

## Query Examples

### Select

```javascript
const users = await avro.database.query(
  'SELECT * FROM users WHERE age > ?',
  [18]
);
```

### Insert

```javascript
const result = await avro.database.query(
  'INSERT INTO users (name, email) VALUES (?, ?)',
  ['Jane', 'jane@example.com']
);
```

### Update

```javascript
await avro.database.query(
  'UPDATE users SET age = ? WHERE id = ?',
  [25, 1]
);
```

### Delete

```javascript
await avro.database.query(
  'DELETE FROM users WHERE id = ?',
  [1]
);
```

## Connection Pooling

For better performance with multiple connections:

```javascript
await avro.database.connect({
  type: 'postgresql',
  host: 'localhost',
  pool: {
    min: 2,
    max: 10
  }
});
```
