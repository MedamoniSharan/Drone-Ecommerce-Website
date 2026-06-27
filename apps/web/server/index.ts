import 'dotenv/config';
import express from 'express';
import { fromNodeHeaders, toNodeHandler } from 'better-auth/node';
import { auth } from '../src/lib/auth';

const REQUIRED_ENV_KEYS: Record<string, string[]> = {
  google: ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'],
  apple: ['APPLE_CLIENT_ID', 'APPLE_CLIENT_SECRET'],
};

const app = express();
const port = Number(process.env.API_PORT) || 4001;

app.get('/api/auth/token', async (req, res) => {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });

  if (!session?.user || !session?.session) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  res.json({
    jwt: session.session.token,
    user: {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
    },
  });
});

app.get('/api/auth/expo-web-success', async (req, res) => {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });

  const payload =
    session?.user && session?.session
      ? {
          type: 'AUTH_SUCCESS',
          jwt: session.session.token,
          user: {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
          },
        }
      : { type: 'AUTH_ERROR', error: 'Unauthorized' };

  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Signing in…</title>
</head>
<body>
<script>
(function () {
  var data = ${JSON.stringify(payload)};
  if (window.parent && window.parent !== window) {
    window.parent.postMessage(data, '*');
  }
})();
</script>
</body>
</html>`;

  res.type('html').send(html);
});

app.get('/api/session', async (req, res) => {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });

  if (!session) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  res.json({
    user: session.user,
    session: session.session,
  });
});

app.get('/api/__create/check-social-secrets', (req, res) => {
  const createEnv = process.env.VITE_CREATE_ENV ?? process.env.NEXT_PUBLIC_CREATE_ENV;
  if (createEnv !== 'DEVELOPMENT') {
    res.status(404).json({ error: 'not found' });
    return;
  }

  const provider = req.query.provider;
  if (typeof provider !== 'string' || !(provider in REQUIRED_ENV_KEYS)) {
    res.status(400).json({ error: 'invalid provider' });
    return;
  }

  const missing = REQUIRED_ENV_KEYS[provider].filter((key) => !process.env[key]);
  res.json({ provider, missing });
});

app.all('/api/auth/{*path}', toNodeHandler(auth));

app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
