const rolePermissions = require("../utils/permissions");

const authorizePermission = (requiredPermission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const userRole = req.user.role;
    const permissions = rolePermissions[userRole];

    if (!permissions) {
      return res.status(403).json({
        success: false,
        message: "Role has no permissions",
      });
    }
    if (!permissions) {
      return res.status(403).json({
        success: false,
        message: "Role has no permissions",
      });
    }

    if (!permissions.includes(requiredPermission)) {
      return res.status(403).json({
        success: false,
        message: "Permission denied",
      });
    }

    next();
  };
};

module.exports = authorizePermission;
