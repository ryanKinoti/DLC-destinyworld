const NodeCache = require("node-cache");
// const { fetchChildrens } = require("./controllers/Childrens");
const cache = new NodeCache();

const getCache = (key) => {
  const cacheResponse = cache.get(key);

  return cacheResponse;
};

const setCache = (key, data) => {
  cache.set(key, data);
  console.log("cache");
};

// setTimeout(() => {
//   //   fetchChildrens;
// }, 3000);
exports.getCache = getCache;
exports.setCache = setCache;
