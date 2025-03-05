import { PrismaClient } from "@prisma/client";
import { ethers } from "ethers";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();

  const { name, email, walletAddress } = body;

  if (!name || !email || !walletAddress) {
    return NextResponse.json(
      { message: "Missing fields" },
      { status: 400 }
    );
  }

  try {
    // Store in MySQL via Prisma
    const profile = await prisma.customer.create({
      data: { name, email, wallet: walletAddress },
    });

    // Store on Ethereum
    const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS,
      ["function createProfile(string name, string email) public"],
      wallet
    );

    const tx = await contract.createProfile(name, email);
    await tx.wait();

    return NextResponse.json(
      { message: "Profile created successfully", profile, txHash: tx.hash },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Transaction failed", error: error.message },
      { status: 500 }
    );
  }
}
