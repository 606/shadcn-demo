---
title: API Endpoints
description: Creating REST API endpoints
---

# API Endpoints

Build REST APIs with Avro easily.

## Define Routes

```javascript
const avro = require('avro');

// GET endpoint
avro.get('/users', async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

// GET endpoint with parameter
avro.get('/users/:id', async (req, res) => {
  const user = await getUser(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// POST endpoint
avro.post('/users', async (req, res) => {
  const user = await createUser(req.body);
  res.status(201).json(user);
});

// PUT endpoint
avro.put('/users/:id', async (req, res) => {
  const user = await updateUser(req.params.id, req.body);
  res.json(user);
});

// DELETE endpoint
avro.delete('/users/:id', async (req, res) => {
  await deleteUser(req.params.id);
  res.status(204).send();
});
```

## Request & Response

Access request data:

```javascript
avro.post('/data', (req, res) => {
  console.log(req.body);      // POST data
  console.log(req.query);     // Query parameters
  console.log(req.params);    // URL parameters
  console.log(req.headers);   // Request headers

  res.json({ status: 'ok' });
});
```

## Error Handling

```javascript
avro.get('/data', async (req, res) => {
  try {
    const data = await fetchData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});
```

## Middleware

```javascript
// Global middleware
avro.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Route-specific middleware
avro.get('/admin', authenticate, (req, res) => {
  res.json({ role: 'admin' });
});

function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}
```
