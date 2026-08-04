const rolePermissions = {
  admin: [
    "products:read",
    "products:create",
    "products:update",
    "products:delete",
    "users:read",
    "users:delete",
  ],
  manager: ["products:read", "products:update", "orders:read", "orders:update"],
  user: ["products:read", "orders:create"],
};

module.exports = rolePermissions;
