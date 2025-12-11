# 📘 Lesson 10 — Middleware in Express.js

### **Student Handout**

---

# **1. What Is Middleware?**

Middleware is a **function** that runs **between** an incoming request and the final response in an Express application.

Think of middleware as steps in a pipeline:

```
Client Request → Middleware → Middleware → Route Handler → Response
```

Middleware can:

* Read or modify the request
* Decide whether a request is allowed
* Stop the request early
* Send a response
* Pass control to the next function using `next()`

You have already used middleware, for example:

```js
app.use(express.json());
```

---

# **2. Why Do We Need Middleware?**

Middleware lets us:

* ✔ Process incoming data
* ✔ Add reusable logic
* ✔ Protect routes with authentication
* ✔ Validate or transform input
* ✔ Log requests
* ✔ Handle errors more cleanly

Without middleware, every route would repeat the same logic.

---

# **3. Common Use Cases**

| Use Case       | What It Does                                       |
| -------------- | -------------------------------------------------- |
| Logging        | Records each request (method, URL, timestamp)      |
| Validation     | Checks whether data from client is valid           |
| Authentication | Ensures only allowed users access certain routes   |
| Parsing        | Converts JSON or form data into usable JS          |
| Error Handling | Prevents crashes and gives readable error messages |
| Static Files   | Serves HTML, CSS, JS, images from a folder         |

---

# **4. Built-In Middleware in Express**

Express includes useful built-in middleware:

| Middleware                 | Purpose                                  |
| -------------------------- | ---------------------------------------- |
| `express.json()`           | Parses JSON request bodies               |
| `express.urlencoded()`     | Parses form submissions                  |
| `express.static('folder')` | Serves static files like images, CSS, JS |

### Example Usage

```js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
```

---

# **5. Creating Custom Middleware**

Middleware functions always receive:

```js
function customMiddleware(req, res, next) {
  // your logic here
  next(); // moves to the next middleware or route
}
```

Use it like:

```js
app.use(customMiddleware);
```

### What makes something middleware?

* It takes `(req, res, next)`
* It can read or modify `req`/`res`
* It decides whether to call `next()`

---

# **6. Practice Exercises**

## **Exercise A — Logging Middleware**

Create middleware that logs method + URL.

```js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
```

Test by visiting different routes.

---

## **Exercise B — Simple Authentication Check**

A route that requires a secret query parameter:

```js
function checkSecret(req, res, next) {
  if (req.query.secret === "1234") {
    next();
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
}
```

Use it:

```js
app.get('/admin', checkSecret, (req, res) => {
  res.json({ message: "Welcome Admin!" });
});
```

Try both:

* `/admin?secret=1234` → Works
* `/admin` → Fails

---

# **7. More Custom Middleware Examples**

Here are additional simple custom middleware examples to help you understand how middleware works in real applications.

---

## **1. Request Counter Middleware**

Counts how many total requests the server has received.

```js
let count = 0;

function countRequests(req, res, next) {
  count++;
  console.log(`Total requests so far: ${count}`);
  next();
}

app.use(countRequests);
```

This counts **all** requests, not per user (because HTTP is stateless).

---

## **2. Maintenance Mode Middleware**

Shows a maintenance message for *every* request.

```js
function maintenance(req, res, next) {
  res.send("Site is under maintenance. Try again later.");
}

app.use(maintenance);
```

> When this middleware is active, no other routes will run.

---

## **3. Validate Required Fields**

Checks if the user sent mandatory data.

```js
function validateUser(req, res, next) {
  const { name, age } = req.body;

  if (!name || !age) {
    return res.status(400).send("Missing name or age");
  }

  next();
}

app.post('/users', validateUser, (req, res) => {
  res.send("User is valid!");
});
```

---

## **4. Slow Down Middleware (Simulate Delay)**

Delays every request by 2 seconds.

```js
function slowDown(req, res, next) {
  setTimeout(() => {
    next();
  }, 2000);
}

app.use(slowDown);
```

This helps students observe asynchronous behavior.

---

# **8. Bonus Challenges (Optional)**

### **1. Add a timestamp to every request**

```js
app.use((req, res, next) => {
  req.requestTime = Date.now();
  next();
});
```

Use it inside a route.

---

### **2. Block DELETE requests**

```js
app.use((req, res, next) => {
  if (req.method === "DELETE") {
    return res.status(403).send("DELETE disabled");
  }
  next();
});
```

---

### **3. Create a simple rate limiter**

Keep track of how many requests a user makes and limit them.
(Implementation left to students to design.)

---

# **8. Key Takeaways**

* Middleware controls the entire lifecycle of a request.
* Almost all Express features are middleware.
* You can stack middleware to build powerful backend workflows.
* Custom middleware is a core backend skill.

---

If you finish early: experiment by writing your own middleware function and applying it only to specific routes.