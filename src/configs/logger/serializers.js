export const serializeRequest = (req) => {
  return {
    id: req.id,
    method: req.method,
    url: req.url,
    host: req.host,
    ip: req.ip,
  };
};

export const serializeResponse = (res) => {
  return {
    statusCode: res.statusCode,
  };
};

export const serializeError = (err) => {
  return {
    type: err.type,
    message: err.message.toLowerCase() || "Internal server error",
  };
};
