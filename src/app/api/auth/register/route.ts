import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  restaurantName: z.string().min(2),
  restaurantSlug: z.string().min(2).regex(/^[a-z0-9-]+₦/),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    // Check if slug is taken
    const existingSlug = await prisma.restaurant.findUnique({
      where: { slug: data.restaurantSlug },
    });
    if (existingSlug) {
      return NextResponse.json({ error: "Restaurant URL already taken" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    // Create restaurant and owner in a transaction
    const restaurant = await prisma.restaurant.create({
      data: {
        name: data.restaurantName,
        slug: data.restaurantSlug,
        users: {
          create: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: "OWNER",
          },
        },
      },
      include: { users: true },
    });

    return NextResponse.json(
      { message: "Account created successfully", restaurantId: restaurant.id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
