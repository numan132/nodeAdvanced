const Buffer = require("safe-buffer").Buffer;
const Keygrip = require("keygrip");
const key = require("../../config/keys");
const keygrip = new Keygrip([key.cookieKey]);

module.exports = (user) => {
  const sessionStorage = {
    passport: {
      user: user._id.toString(),
    },
  };

  const session = Buffer.from(JSON.stringify(sessionStorage)).toString("base64");


  const sig = keygrip.sign("session=" + session);

  return {session, sig}
}