import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  // Get walletAddress from searchParams
  const { searchParams } = new URL(request.url);
  const walletAddress = searchParams.get('walletAddress');

  if (!walletAddress) {
    return NextResponse.json(
      { message: "Wallet address is required" },
      { status: 400 }
    );
  }

  try {
    const profile = await prisma.customer.findUnique({
      where: { wallet: walletAddress },
    });

    if (!profile) {
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to retrieve profile", error: error.message },
      { status: 500 }
    );
  }
}
