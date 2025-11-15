// scripts/seed-user.cjs

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // 🔧 CHANGE THESE IF YOU WANT
  const email = "audrey@example.com";
  const rawPassword = "SuperSecurePassword!"; // password Audrey will use at /login
  const clientId = "5f360c54-4714-4441-a704-175d143b7fe4"; // MUST match job_applications.client_id

  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      clientId,
    },
    create: {
      email,
      password: hashedPassword,
      clientId,
      name: "Audrey",
    },
  });

  console.log("✅ User upserted:", {
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
