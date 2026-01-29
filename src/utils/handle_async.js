const to = (func) => {
  return func
    .then((res) => ({ error: null, data: res }))
    .catch((err) => ({ error: err, data: null }));
};

export default to;
