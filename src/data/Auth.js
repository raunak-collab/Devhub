import { auth } from "../auth";
import connectDb from "../lib/connectDb";
import { Session } from "../models/sessionModel";
import { User } from "../models/userModels";
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export default async function getLoggedUser() {
  const errorResponse = Response.json(
    { error: "Please Login" },
    { status: 401 }
  );

  // 1. Check Auth.js OAuth session
  const authSession = await auth();

  if (authSession?.user?.id) {
    await connectDb();

    const user = await User.findById(
      authSession.user.id
    ).select("_id name email");

    if (!user) {
      return errorResponse;
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
  }

  // 2. Check custom credentials session
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get("userId")?.value;

  const [sessionId, signatureFromCookies] =
    cookieValue?.split(".") || [];

  if (!sessionId || !signatureFromCookies) {
    return errorResponse;
  }

  if (!verifyCookie(sessionId, signatureFromCookies)) {
    return errorResponse;
  }

  await connectDb();

  const session = await Session.findById(sessionId);

  if (!session) {
    return errorResponse;
  }

  // Keep your existing session limit behavior
  const allSessions = await Session.find({
    userId: session.userId,
  });

  if (allSessions.length >= 3) {
    const oldestSession = allSessions[0];

    if (oldestSession) {
      await Session.findByIdAndDelete(oldestSession._id);
    }
  }

  const user = await User.findById(
    session.userId
  ).select("_id name email");

  if (!user) {
    return errorResponse;
  }

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  };
}

export const signedCookie = (sessionId) => {
  const secret = process.env.COOKIE_SECRET;

  if (!secret) {
    throw new Error("COOKIE_SECRET is not configured");
  }

  const signature = createHmac("sha256", secret)
    .update(sessionId)
    .digest("hex");

  return `${sessionId}.${signature}`;
};

export const verifyCookie = (
  sessionId,
  signatureFromCookies
) => {
  if (!sessionId || !signatureFromCookies) {
    return false;
  }

  const expectedSignature = signedCookie(sessionId)
    .split(".")[1];

  const expected = Buffer.from(expectedSignature, "hex");
  const received = Buffer.from(signatureFromCookies, "hex");

  if (expected.length !== received.length) {
    return false;
  }

  return timingSafeEqual(expected, received);
};