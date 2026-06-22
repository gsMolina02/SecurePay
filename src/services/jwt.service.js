const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

function signToken(user) {
  const privateKey = fs.readFileSync(path.join(__dirname, '../../private.pem'), 'utf8');
  return jwt.sign(
    { sub: user.id, name: user.email },
    privateKey,
    { algorithm: 'RS256', expiresIn: '2m' }
  );
}

function verifyToken(token) {
  const publicKey = fs.readFileSync(path.join(__dirname, '../../public.pem'), 'utf8');
  return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
}

module.exports = {
  signToken,
  verifyToken
};
