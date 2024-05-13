import { PrismaClient } from "@prisma/client";
import { JwtAdapter } from "../src/config";
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.create({
    data: {
      name: "admin",
      email: "admin@admin.com",
      password: "$2a$10$ih7fbEbrU.3qmntBF.jqietRjHdFvsEvyBdsnpqU.dZ9OBeYqhDT6",
      role: "ADMIN",
      accessToken: await JwtAdapter.generateToken({ email: "admin@admin.com" })
    },
  });
  console.log({ admin });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
