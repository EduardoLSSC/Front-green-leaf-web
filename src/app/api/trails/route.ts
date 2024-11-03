import { NextResponse } from "next/server";
import GetDotenvVariable from "@/config/dotenfconfig";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";
import { Trail } from "../../../interfaces/Trails";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.token) {
      console.log("Sessão não encontrada ou token ausente");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const apiUrlTrails = `${GetDotenvVariable("ENVIROMENT")}/trails`;

    const trailsResponse = await fetch(apiUrlTrails, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.user.token}`,
        "Content-Type": "application/json",
      },
    });

    if (!trailsResponse.ok) {
      throw new Error(`Erro ao buscar trilhas: ${trailsResponse.statusText}`);
    }

    const trailsData = await trailsResponse.json();

    const trailsWithAuthors = trailsData.data.map((trail: Trail) => {
      return {
        ...trail,
        author: trail.createdBy ? `${trail.createdBy.firstName} ${trail.createdBy.lastName}` : 'Autor Desconhecido',
      };
    });

    return NextResponse.json(trailsWithAuthors, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar trilhas:", error);
    return NextResponse.json({ message: "Erro ao buscar trilhas" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const apiUrlTrails = `${GetDotenvVariable("ENVIROMENT")}/trails`;
    const newTrail = await req.json(); // Parse the incoming JSON body

    const createResponse = await fetch(apiUrlTrails, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTrail),
    });

    if (!createResponse.ok) {
      console.error("Backend error response:", await createResponse.text()); // Log the backend response for debugging
      throw new Error(`Failed to create trail: ${createResponse.statusText}`);
    }

    const createdTrail = await createResponse.json();
    return NextResponse.json(createdTrail, { status: 201 });
    } catch (error) {
    // Cast error to `Error` type if you are certain it is an instance of `Error`
    if (error instanceof Error) {
      console.error("Error in POST /api/trails:", error.message);
      return NextResponse.json({ message: "Error creating trail", details: error.message }, { status: 500 });
    } else {
      // Handle cases where `error` might not be an `Error` instance
      console.error("Unexpected error in POST /api/trails:", error);
      return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
    }
  }
  
}
