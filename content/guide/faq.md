---
title: FAQ
description: Frequently asked questions
---

# Frequently Asked Questions

## General Questions

### What is Avro?

Avro is a lightweight, fast framework for building scalable applications with Node.js.

### Is Avro free?

Yes, Avro is open-source and completely free to use.

### What are the system requirements?

- Node.js 16.0 or higher
- 100MB disk space
- 256MB RAM minimum

## Installation & Setup

### Can I use Avro with TypeScript?

Yes! Avro has full TypeScript support. Install `@types/avro`:

```bash
npm install --save-dev @types/avro
```

### How do I update Avro?

```bash
npm update avro
```

### Can I use Avro in the browser?

Avro is designed for Node.js server-side development. For browser use, consider Avro-Client.

## Usage

### How do I connect to a database?

```javascript
const db = await avro.database.connect({
  host: 'localhost',
  port: 5432
});
```

### Can I run multiple instances?

Yes, Avro supports clustering:

```javascript
const cluster = avro.cluster({
  workers: 4
});
```

### How do I handle errors?

Use try-catch blocks with async/await:

```javascript
try {
  await avro.operation();
} catch (error) {
  console.error('Operation failed:', error);
}
```

## Performance

### How can I improve performance?

- Use connection pooling
- Enable caching
- Use batch operations
- Monitor memory usage
- Profile your code

### What's the maximum request size?

The default is 10MB, but this can be configured in settings.
