import db from "@/lib/db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationTokenDetails = await db.verificationToken.findFirst({
      where: { email },
    });

    return verificationTokenDetails;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationTokenDetails = await db.verificationToken.findUnique({
      where: { token },
    });

    return verificationTokenDetails;
  } catch (error) {
    console.log(error);
    return null;
  }
};
