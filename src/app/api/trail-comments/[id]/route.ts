import { NextResponse } from "next/server";
import GetDotenvVariable from "@/config/dotenfconfig";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/authOptions";

export const dynamic = "force-dynamic";

// GET: Retorna os comentários de uma trilha específica
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.token) {
      console.error("Usuário não autenticado ou token ausente.");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const trailId = params.id;
    if (!trailId) {
      return NextResponse.json({ message: "Trail ID is required" }, { status: 400 });
    }

    const apiUrl = `${GetDotenvVariable("ENVIROMENT")}/trail-comments/${trailId}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.user.token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar comentários: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar comentários:", error);
    return NextResponse.json({ message: "Erro ao buscar comentários" }, { status: 500 });
  }
}

// POST: Cria um novo comentário
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const apiUrl = `${GetDotenvVariable("ENVIROMENT")}/trail-comments`;
    const commentData = await req.json();

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      throw new Error(`Erro ao criar comentário: ${response.statusText}`);
    }

    const createdComment = await response.json();
    return NextResponse.json(createdComment, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar comentário:", error);
    return NextResponse.json({ message: "Erro ao criar comentário" }, { status: 500 });
  }
}
