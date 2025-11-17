// scripts/seed-user.cjs

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // Audrey’s details
  const email = "audrey.pagnon@gmail.com";
  const rawPassword = "AudreyPagnon!";
  const clientId = "5f360c54-4714-4441-a704-175d143b7fe4"; // REAL EXISTING client_id

  const hashedPassword = await bcrypt.hash(rawPassword, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      name: "Audrey Pagnon",
      password: hashedPassword,
      clientId,
    },
    create: {
      name: "Audrey Pagnon",
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
