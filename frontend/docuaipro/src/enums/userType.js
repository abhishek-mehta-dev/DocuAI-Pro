export const userType = Object.freeze({
  USER: "user",
  ADMIN: "admin",
  toArray: function () {
    return Object.values(this).filter((value) => typeof value !== "function");
  },
});
