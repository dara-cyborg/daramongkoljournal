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
      .video-wrap { position: relative; width: 100%; aspect-ratio: 16 / 9; border-radius: 14px; overflow: hidden; border: 1px solid #27272a; background: #000; }
      .video-wrap iframe { width: 100%; height: 100%; border: 0; }
    </style>
  </head>
  <body>
    <main class="wrap">
      <section class="panel">
        <p class="label">admin endpoint</p>
        <h1>Administrator Access</h1>
        <p style="margin-top: 10px;">Administrator access is live.</p>
        <div class="video-wrap" style="margin-top: 16px;">
          <video id="adminVideo" src="/media/admin-video.mp4" controls playsinline loop preload="auto" style="width: 100%; height: 100%; background: #000;"></video>
        </div>
      </section>
    </main>
    <script>
      const video = document.getElementById('adminVideo');
      if (video) {
        video.volume = 1;
        video.muted = false;
        video.loop = true;
        video.play().catch(() => {});
      }
    </script>
  </body>
</html>`);
    return;
  }

  res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
  res.status(401).send('Unauthorized');
}
