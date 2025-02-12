import { Request } from "express";

var jwt = require("express-jwt");
var data = require("./data");
var utilities = require("./utilities");

var getSecret = async function (req: Request, token: any) {
  const issuer = token.payload.iss;
  const tenant = await data.getTenantByIdentifier(issuer);
  if (!tenant) {
    throw new Error("missing_secret");
  }
  return utilities.decrypt(tenant.secret);
};
