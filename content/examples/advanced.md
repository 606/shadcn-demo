---
title: Advanced Example
description: More complex example with real-world usage
---

# Advanced Example

Here's a more realistic example combining multiple Avro features.

## Building a User Management Service

```javascript
const avro = require('avro');

class UserService {
  constructor() {
    this.cache = new Map();
  }

  async initialize() {
    await avro.initialize({
      name: 'UserService',
      debug: true
    });
    
    await avro.database.connect({
      host: 'localhost',
      name: 'userdb'
    });
  }

  async getUser(id) {
    // Check cache first
    if (this.cache.has(id)) {
      return this.cache.get(id);
    }

    try {
      const user = await avro.database.query(
        'SELECT * FROM users WHERE id = ?',
        [id]
      );

      if (user) {
        this.cache.set(id, user);
      }

      return user;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw error;
    }
  }

  async createUser(userData) {
    try {
      const result = await avro.database.query(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        [userData.name, userData.email]
      );

      // Invalidate cache
      this.cache.clear();

      return result;
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      await avro.database.query(
        'DELETE FROM users WHERE id = ?',
        [id]
      );

      // Remove from cache
      this.cache.delete(id);

      return true;
    } catch (error) {
      console.error('Failed to delete user:', error);
      throw error;
    }
  }
}

// Usage
const userService = new UserService();

async function main() {
  try {
    await userService.initialize();

    // Create a user
    const newUser = await userService.createUser({
      name: 'John Doe',
      email: 'john@example.com'
    });

    // Fetch user (cached)
    const user = await userService.getUser(newUser.id);
    console.log('User:', user);

    // Delete user
    await userService.deleteUser(newUser.id);

  } catch (error) {
    console.error('Service error:', error);
  }
}

main();
```

## Key Concepts Used

- **Initialization**: Setting up the service
- **Database Connection**: Connecting to a database
- **Caching**: Improving performance with in-memory cache
- **Error Handling**: Try-catch blocks for error management
- **Query Building**: Creating SQL queries
- **Cache Invalidation**: Keeping data fresh
