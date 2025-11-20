// scripts/seed-libby.cjs

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const email = "libby@example.com";                 // ← put Libby's email here
  const rawPassword = "LibbyTempPassword123!";       // ← temporary password
  const clientId = "24c3a678-ffa0-41d6-8f69-ff45796a97ed"; // ← her actual clientId

  const hashedPassword = await bcrypt.hash(rawPassword, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      name: "Libby",
      password: hashedPassword,
      clientId,
    },
    create: {
      name: "Libby",
      email,
      password: hashedPassword,
      clientId,
    },
  });

  console.log("✅ User created or updated:");
  console.log({
    id: user.id,
    email: user.email,
    clientId: user.clientId,
  });
}

main()
  .catch((e) => {
    console.error("❌ Error seeding user:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
