import prisma from "@/lib/prisma";

export async function resolveTenant(slug: string) {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
  });
  return restaurant;
}

export async function getTenantByUserId(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { restaurant: true },
  });
  return user?.restaurant ?? null;
}
