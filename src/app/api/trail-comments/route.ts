import { NextResponse } from "next/server";
import GetDotenvVariable from "@/config/dotenfconfig";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";

export const dynamic = "force-dynamic";

// GET: Retorna os comentários de uma trilha específica
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.token) {
      console.log("Sessão não encontrada ou token ausente");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Extrai o ID da trilha da URL
    const url = new URL(req.url);
    const trailId = url.pathname.split("/").pop();

    if (!trailId) {
      return NextResponse.json({ message: "Trail ID is required" }, { status: 400 });
    }

    const apiUrlComments = `${GetDotenvVariable("ENVIROMENT")}/trail-comments/${trailId}`;

    const commentsResponse = await fetch(apiUrlComments, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.user.token}`,
        "Content-Type": "application/json",
      },
    });

    if (!commentsResponse.ok) {
      throw new Error(`Erro ao buscar comentários: ${commentsResponse.statusText}`);
    }

    const commentsData = await commentsResponse.json();
    return NextResponse.json(commentsData, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar comentários:", error);
    return NextResponse.json({ message: "Erro ao buscar comentários" }, { status: 500 });
  }
}

// POST: Cria um novo comentário para uma trilha
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const apiUrlComments = `${GetDotenvVariable("ENVIROMENT")}/trail-comments`;

    const newComment = await req.json(); // Parse o corpo da requisição

    const createResponse = await fetch(apiUrlComments, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    });

    if (!createResponse.ok) {
      console.error("Erro do backend:", await createResponse.text()); // Log para depuração
      throw new Error(`Erro ao criar comentário: ${createResponse.statusText}`);
    }

    const createdComment = await createResponse.json();
    return NextResponse.json(createdComment, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar comentário:", error);
    return NextResponse.json({ message: "Erro ao criar comentário" }, { status: 500 });
  }
}
