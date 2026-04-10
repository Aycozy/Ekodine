import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clean existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.table.deleteMany();
  await prisma.user.deleteMany();
  await prisma.restaurant.deleteMany();

  // Create restaurant
  const restaurant = await prisma.restaurant.create({
    data: {
      name: "Iya Basira Buka",
      slug: "iya-basira",
      address: "No 45 Allen Avenue, Ikeja, Lagos 100281",
      phone: "+1 (555) 123-4567",
      plan: "PRO",
    },
  });

  // Create owner
  const hashedPassword = await bcrypt.hash("password123", 12);
  await prisma.user.create({
    data: {
      name: "Alex Johnson",
      email: "alex@bellaitalia.com",
      password: hashedPassword,
      role: "OWNER",
      restaurantId: restaurant.id,
    },
  });

  // Create staff
  await prisma.user.createMany({
    data: [
      { name: "Maria Garcia", email: "maria@bellaitalia.com", password: hashedPassword, role: "MANAGER", restaurantId: restaurant.id },
      { name: "James Wilson", email: "james@bellaitalia.com", password: hashedPassword, role: "STAFF", restaurantId: restaurant.id },
      { name: "Sarah Chen", email: "sarah@bellaitalia.com", password: hashedPassword, role: "STAFF", restaurantId: restaurant.id },
    ],
  });

  // Create tables
  await prisma.table.createMany({
    data: [
      { name: "Table 1", seats: 2, restaurantId: restaurant.id },
      { name: "Table 2", seats: 2, restaurantId: restaurant.id },
      { name: "Table 3", seats: 4, restaurantId: restaurant.id },
      { name: "Table 5", seats: 4, restaurantId: restaurant.id },
      { name: "Table 7", seats: 6, restaurantId: restaurant.id },
      { name: "Table 8", seats: 6, restaurantId: restaurant.id },
      { name: "Table 10", seats: 8, restaurantId: restaurant.id },
      { name: "Table 12", seats: 8, restaurantId: restaurant.id },
    ],
  });

  // Create menu items
  await prisma.menuItem.createMany({
    data: [
      { name: "Jollof Rice & Chicken", description: "Creamy Nigerian classic with pancetta and parmesan.", price: 18.5, category: "Mains", available: true, restaurantId: restaurant.id },
      { name: "Abacha (African Salad)", description: "Romaine lettuce, croutons, parmesan, and caesar dressing.", price: 12.0, category: "Starters", available: true, restaurantId: restaurant.id },
      { name: "Pounded Yam & Egusi", description: "Fresh mozzarella, tomato sauce, and basil on a thin crust.", price: 16.0, category: "Mains", available: true, restaurantId: restaurant.id },
      { name: "Grilled Catfish (Point & Kill)", description: "Atlantic salmon with lemon butter sauce and seasonal vegetables.", price: 24.0, category: "Mains", available: false, restaurantId: restaurant.id },
      { name: "Puff Puff", description: "Classic Nigerian dessert with espresso-soaked ladyfingers.", price: 9.5, category: "Desserts", available: true, restaurantId: restaurant.id },
      { name: "Chicken Wings", description: "Crispy buffalo wings with ranch dipping sauce.", price: 14.0, category: "Starters", available: true, restaurantId: restaurant.id },
      { name: "Zobo Drink", description: "Fresh mint, lime, white rum, and soda water.", price: 11.0, category: "Drinks", available: true, restaurantId: restaurant.id },
      { name: "Chocolate Lava Cake", description: "Warm chocolate cake with a molten center and vanilla ice cream.", price: 10.5, category: "Desserts", available: true, restaurantId: restaurant.id },
      { name: "Truffle Fries", description: "Hand-cut fries with truffle oil and parmesan shavings.", price: 8.0, category: "Sides", available: true, restaurantId: restaurant.id },
      { name: "Bruschetta", description: "Toasted bread topped with tomatoes, garlic, and basil.", price: 9.0, category: "Starters", available: true, restaurantId: restaurant.id },
      { name: "Espresso", description: "Rich Nigerian espresso shot.", price: 3.5, category: "Drinks", available: true, restaurantId: restaurant.id },
      { name: "Panna Cotta", description: "Vanilla cream dessert with berry compote.", price: 8.5, category: "Desserts", available: true, restaurantId: restaurant.id },
    ],
  });

  // Create orders
  const menuItems = await prisma.menuItem.findMany({ where: { restaurantId: restaurant.id } });
  
  const order1 = await prisma.order.create({
    data: {
      status: "PREPARING",
      total: 34.5,
      tableNumber: "Table 5",
      restaurantId: restaurant.id,
      items: {
        create: [
          { name: "Jollof Rice & Chicken", price: 18.5, quantity: 1, menuItemId: menuItems[0].id },
          { name: "Abacha (African Salad)", price: 12.0, quantity: 1, menuItemId: menuItems[1].id },
        ],
      },
    },
  });

  const order2 = await prisma.order.create({
    data: {
      status: "PENDING",
      total: 41.0,
      note: "No onions please",
      tableNumber: "Table 12",
      restaurantId: restaurant.id,
      items: {
        create: [
          { name: "Pounded Yam & Egusi", price: 16.0, quantity: 2, menuItemId: menuItems[2].id },
        ],
      },
    },
  });

  // Create reservations
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  await prisma.reservation.createMany({
    data: [
      { name: "John Smith", email: "john@email.com", phone: "+1 555-0101", partySize: 4, date: new Date(), status: "CONFIRMED", restaurantId: restaurant.id },
      { name: "Emily Davis", email: "emily@email.com", phone: "+1 555-0102", partySize: 2, date: new Date(), status: "PENDING", restaurantId: restaurant.id },
      { name: "Michael Brown", email: "michael@email.com", phone: "+1 555-0103", partySize: 6, date: tomorrow, status: "CONFIRMED", restaurantId: restaurant.id },
      { name: "Sarah Wilson", email: "sarah@email.com", phone: "+1 555-0104", partySize: 3, date: tomorrow, status: "PENDING", restaurantId: restaurant.id },
    ],
  });

  console.log("✅ Seed complete!");
  console.log(`   Restaurant: ${restaurant.name} (${restaurant.slug})`);
  console.log(`   Login: alex@bellaitalia.com / password123`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.₦disconnect();
  });
