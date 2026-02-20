import { prisma } from "../../config/prisma";
import { seedUsers } from "./userSeeder";
import { seedProducts } from "./productSeeder";

const main = async () => {
    try {
        await prisma.$connect();
        await seedProducts(20);
        console.log("Semeadura completa");

    } catch(error) {
        console.error("Error ao semear", error);
    }
};

main()
    .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });