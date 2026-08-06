const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();


// ============================================================
// 1. BASIC EXPRESS CONFIGURATION
// ============================================================

app.use(express.json());

// cookie-parser allows us to read cookies using req.cookies
app.use(cookieParser());


// ============================================================
// 2. EXPRESS SESSION CONFIGURATION
// ============================================================

app.use(
  session({
    // Secret used to sign the session ID cookie
    secret: "mySessionSecret",

    // Don't save a session if nothing was modified
    resave: false,

    // Don't create an empty session for every visitor
    saveUninitialized: false,

    cookie: {
      // Prevent JavaScript from accessing the session cookie
      httpOnly: true,

      // In localhost development we use HTTP
      // In production HTTPS, change this to true
      secure: false,

      // Helps protect against certain CSRF scenarios
      sameSite: "lax",

      // Session expires after 1 hour
      maxAge: 60 * 60 * 1000,
    },
  })
);


// ============================================================
// 3. BASIC COOKIE
// ============================================================

// Set a normal cookie
app.get("/cookie/set", (req, res) => {

  res.cookie("username", "Praveen");

  res.json({
    success: true,
    message: "Cookie created",
  });
});


// ============================================================
// 4. READ COOKIE
// ============================================================

app.get("/cookie/get", (req, res) => {

  const username = req.cookies.username;

  res.json({
    success: true,
    username: username || null,
  });
});


// ============================================================
// 5. CLEAR COOKIE
// ============================================================

app.get("/cookie/clear", (req, res) => {

  res.clearCookie("username");

  res.json({
    success: true,
    message: "Cookie cleared",
  });
});


// ============================================================
// 6. COOKIE PROPERTIES
// ============================================================

app.get("/cookie/secure", (req, res) => {

  res.cookie("authToken", "abc123", {

    // JavaScript cannot access this cookie
    httpOnly: true,

    // true in production HTTPS
    secure: false,

    // Controls cross-site cookie behavior
    sameSite: "lax",

    // Cookie lifetime = 30 minutes
    maxAge: 30 * 60 * 1000,

    // Cookie available throughout the application
    path: "/",
  });

  res.json({
    success: true,
    message: "Secure cookie created",
  });
});


// ============================================================
// 7. COOKIE WITH EXPIRATION DATE
// ============================================================

app.get("/cookie/expiry", (req, res) => {

  const expiryDate = new Date();

  // Cookie expires after 1 hour
  expiryDate.setHours(expiryDate.getHours() + 1);

  res.cookie("temporaryCookie", "hello", {
    expires: expiryDate,
  });

  res.json({
    success: true,
    message: "Cookie created with expiry date",
  });
});


// ============================================================
// 8. SESSION BASICS
// ============================================================

// Create session data
app.get("/session/set", (req, res) => {

  req.session.user = {
    id: 1,
    name: "Praveen",
    role: "user",
  };

  res.json({
    success: true,
    message: "Session created",
    session: req.session.user,
  });
});


// ============================================================
// 9. READ SESSION
// ============================================================

app.get("/session/get", (req, res) => {

  if (!req.session.user) {
    return res.status(401).json({
      success: false,
      message: "No active session",
    });
  }

  res.json({
    success: true,
    message: "Session found",
    user: req.session.user,
  });
});


// ============================================================
// 10. DESTROY SESSION / LOGOUT
// ============================================================

app.get("/session/logout", (req, res) => {

  req.session.destroy((error) => {

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Unable to logout",
      });
    }

    res.clearCookie("connect.sid");

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  });
});


// ============================================================
// 11. SESSION LOGIN
// ============================================================

app.post("/login", (req, res) => {

  const { email, password } = req.body;

  // Simple demo credentials
  if (
    email !== "admin@gmail.com" ||
    password !== "admin123"
  ) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  // Store authenticated user in session
  req.session.user = {
    id: 1,
    name: "Admin",
    email: "admin@gmail.com",
    role: "admin",
  };

  res.json({
    success: true,
    message: "Login successful",
  });
});


// ============================================================
// 12. SESSION PROTECTED ROUTE
// ============================================================

app.get("/dashboard", (req, res) => {

  // Check whether user is authenticated
  if (!req.session.user) {
    return res.status(401).json({
      success: false,
      message: "Please login first",
    });
  }

  res.json({
    success: true,
    message: "Welcome to Dashboard",
    user: req.session.user,
  });
});


// ============================================================
// 13. SESSION AUTHORIZATION
// ============================================================

app.get("/admin", (req, res) => {

  // Authentication check
  if (!req.session.user) {
    return res.status(401).json({
      success: false,
      message: "Please login first",
    });
  }

  // Authorization check
  if (req.session.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }

  res.json({
    success: true,
    message: "Welcome Admin",
  });
});


// ============================================================
// 14. CHECK SESSION ID
// ============================================================

app.get("/session/info", (req, res) => {

  res.json({
    success: true,

    // Express-session generates a session ID
    sessionID: req.sessionID,

    // Our session data
    session: req.session,
  });
});


// ============================================================
// 15. UPDATE SESSION
// ============================================================

app.get("/session/update", (req, res) => {

  if (!req.session.user) {
    return res.status(401).json({
      success: false,
      message: "No active session",
    });
  }

  req.session.user.name = "Praveen Nagaraj";

  res.json({
    success: true,
    message: "Session updated",
    user: req.session.user,
  });
});


// ============================================================
// 16. SESSION REGENERATION
// ============================================================

app.get("/session/regenerate", (req, res) => {

  req.session.regenerate((error) => {

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Unable to regenerate session",
      });
    }

    // Create a fresh session
    req.session.user = {
      id: 1,
      name: "Praveen",
      role: "user",
    };

    res.json({
      success: true,
      message: "Session regenerated",
      sessionID: req.sessionID,
      user: req.session.user,
    });
  });
});


// ============================================================
// 17. SESSION COOKIE
// ============================================================

// express-session automatically creates a cookie:
//
// connect.sid
//
// The browser does NOT store the complete session object.
//
// Instead:
//
// Browser
//    |
//    | connect.sid
//    ↓
// Server
//    |
//    | Find matching session
//    ↓
// Session Data
//
// This is the key difference between a cookie and a session.


// ============================================================
// 18. COOKIE vs SESSION DEMONSTRATION
// ============================================================

app.get("/compare", (req, res) => {

  res.cookie("clientData", "hello");

  req.session.serverData = {
    message: "Hello from session",
  };

  res.json({
    success: true,

    cookie: {
      message:
        "Stored on the client/browser",
      value: "hello",
    },

    session: {
      message:
        "Session data is maintained server-side",
      value: req.session.serverData,
    },
  });
});


// ============================================================
// 19. SESSION COOKIE CONFIGURATION
// ============================================================

// Our session cookie is configured above:
//
// httpOnly: true
// secure: false
// sameSite: "lax"
// maxAge: 1 hour
//
// The cookie contains the session identifier,
// not our complete user object.


// ============================================================
// 20. SERVER
// ============================================================

app.listen(3000, () => {
  console.log("Server running on port 3000");
});