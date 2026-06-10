import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin';

function requireBasicAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).send('Unauthorized');
  }

  const encoded = authHeader.slice('Basic '.length);
  const decoded = Buffer.from(encoded, 'base64').toString('utf-8');
  const [username, password] = decoded.split(':');

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return next();
  }

  res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
  return res.status(401).send('Unauthorized');
}

app.get('/admin/', requireBasicAuth, (_req, res) => {
  res.sendFile(path.resolve('dist/admin/index.html'));
});

app.get('/admin', (_req, res) => {
  res.redirect('/admin/');
});

app.use(express.static('dist'));

app.listen(PORT, () => {
  console.log(`Admin server running at http://localhost:${PORT}`);
});
