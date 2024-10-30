import { NextResponse } from "next/server";
import GetDotenvVariable from "@/config/dotenfconfig";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions"
import { Trail } from "../../../interfaces/Trails";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
        
    if (!session || !session.user || !session.user.token) {
      console.log("Sessão não encontrada ou token ausente");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const apiUrlTrails = `${GetDotenvVariable("ENVIROMENT")}/trails`; // URL das trilhas

    // Buscar trilhas
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
