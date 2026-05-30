import { SignJWT, jwtVerify } from 'jose';

const COOKIE_NAME = 'authToken';

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error('Missing AUTH_SECRET env var');
  return new TextEncoder().encode(secret);
}

export type AdminSession = {
  uid: string;
  email: string;
  role: 'admin';
};

export function getAuthCookieName() {
  return COOKIE_NAME;
}

export async function signAdminSession(payload: AdminSession, expiresInSeconds: number) {
  const secret = getSecret();
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + expiresInSeconds)
    .sign(secret);
}

export async function verifyAdminSession(token: string) {
  const secret = getSecret();
  const { payload } = await jwtVerify(token, secret);

  const uid = payload.uid;
  const email = payload.email;
  const role = payload.role;

  if (typeof uid !== 'string' || typeof email !== 'string' || role !== 'admin') {
    throw new Error('Invalid session payload');
  }

  return { uid, email, role } as AdminSession;
}



