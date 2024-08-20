import { v4 as uuidv4 } from "uuid";
import db from "@/lib/db";

import { getVerificationTokenByEmail } from "@/data/verification-token";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  // expires in 1 hour
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const newVerificationTokenDetails = await db.verificationToken.create({
    data: {
      email,
      token,
      expires: expiresAt,
    },
  });

  return newVerificationTokenDetails;
};
