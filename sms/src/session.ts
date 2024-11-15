import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

import "server-only";
const secretKey = process.env.SESSION_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1D")
    .sign(key);
}

export async function decrypt(token: string | undefined = ""): Promise<any> {
  // console.log(token);
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return { user: null };
  }
}

export async function createSession(user: any) {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt({ user, expiresAt });
  cookies().set("__session", session, {
    expires: expiresAt,
    secure: true,
    sameSite: "strict",
    httpOnly: true,
  });
}

// export async function updateSession() {
//   const session = (await cookies()).get("__session")?.value;
//   const payload = await decrypt(session);

// }

export async function deleteSession() {
  cookies().delete("__session");
  cookies().delete("__u_id");
}
