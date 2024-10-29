import { NextResponse } from "next/server";
import GetDotenvVariable from "@/config/dotenfconfig";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validações básicas podem ser feitas aqui
    if (!body.firstName || !body.lastName || !body.email || !body.password) {
      return NextResponse.json({ message: "Todos os campos são obrigatórios" }, { status: 400 });
    }

    const apiUrlUsers = `${GetDotenvVariable("ENVIROMENT")}/users`;

    // Enviar a requisição para criar o usuário
    const userResponse = await fetch(apiUrlUsers, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        profilePicture: body.profilePicture || "", // Se a foto de perfil for opcional
      }),
    });

    if (!userResponse.ok) {
      throw new Error(`Erro ao registrar usuário: ${userResponse.statusText}`);
    }

    const userData = await userResponse.json();

    // Retornar os dados do usuário criado
    return NextResponse.json(userData, { status: 201 });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return NextResponse.json({ message: "Erro ao registrar usuário" }, { status: 500 });
  }
}
