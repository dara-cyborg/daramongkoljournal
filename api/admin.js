export default function handler(req, res) {
  const expectedUser = process.env.ADMIN_USER || 'admin';
  const expectedPass = process.env.ADMIN_PASS || 'admin';

  const authHeader = req.headers.authorization || '';

  if (!authHeader.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
    res.status(401).send('Unauthorized');
    return;
  }

  const encoded = authHeader.slice('Basic '.length);
  const decoded = Buffer.from(encoded, 'base64').toString('utf-8');
  const [username, password] = decoded.split(':');

  if (username === expectedUser && password === expectedPass) {
    res.status(200).send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Admin</title>
    <style>
      :root { color-scheme: dark; font-family: Arial, Helvetica, sans-serif; background: #000; color: #e4e4e7; }
      * { box-sizing: border-box; }
      body { margin: 0; min-height: 100vh; background: linear-gradient(180deg, #09090b 0%, #000 100%); }
      .wrap { max-width: 980px; margin: 0 auto; padding: 32px 18px 60px; }
      .panel { border: 1px solid #27272a; background: #09090b; border-radius: 14px; padding: 18px; box-shadow: 0 10px 30px rgba(0,0,0,0.35); }
      .label { text-transform: uppercase; letter-spacing: .25em; font-size: 11px; color: #a1a1aa; }
      h1 { margin: 8px 0 0; font-size: 22px; color: #ecfccb; }
      p { color: #d4d4d8; line-height: 1.45; }
      code { color: #86efac; font-family: ui-monospace, SFMono-Regular, monospace; }
    </style>
  </head>
  <body>
    <main class="wrap">
      <section class="panel">
        <p class="label">admin endpoint</p>
        <h1>Administrator Access</h1>
        <p style="margin-top: 10px;">This page is now protected by real server-side Basic Auth, which is compatible with Vercel free hosting.</p>
        <p style="margin-top: 8px;">Credentials: <code>admin / admin</code> unless you override <code>ADMIN_USER</code> and <code>ADMIN_PASS</code> in Vercel.</p>
      </section>
    </main>
  </body>
</html>`);
    return;
  }

  res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
  res.status(401).send('Unauthorized');
}
