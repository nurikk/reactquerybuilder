const makePath = (id, path) => {
  return [].concat(path, [id]);
};
export {makePath};


const getId = (path) => {
  return path[path.length-1];
};
export {getId};


const getParent = (path) => {
  return path[path.length-2];
};
export {getParent};


const isRootElement = (path) => {
  return path.length === 0 && path[0] === 0;
};
export {isRootElement};