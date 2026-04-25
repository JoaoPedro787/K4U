import PinoHttp from "pino-http";

import { v4 as uuidv4 } from "uuid";

import {
  serializeRequest,
  serializeResponse,
  serializeError,
} from "./serializers";

const logger = PinoHttp({
  genReqId: () => uuidv4(),
  serializers: {
    req: serializeRequest,
    res: serializeResponse,
    err: serializeError,
  },
  customLogLevel: function (_req, res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return "warn";
    } else if (res.statusCode >= 500 || err) {
      return "error";
    } else if (res.statusCode >= 300 && res.statusCode < 400) {
      return "silent";
    }
    return "info";
  },
  customSuccessMessage: function (req, _res) {
    return req.logMessage || "request completed";
  },
  customProps: function (req, _res) {
    return {
      user: req.user || "anonymous",
      extras: req.logExtras,
    };
  },
});

export default logger;
