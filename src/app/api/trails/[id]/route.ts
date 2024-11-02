import { NextResponse } from "next/server";
import GetDotenvVariable from "@/config/dotenfconfig";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/authOptions";
import { Trail } from "../../../../interfaces/Trails";

export const dynamic = "force-dynamic";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const trailId = params.id;
    const apiUrlTrail = `${GetDotenvVariable("ENVIROMENT")}/trails/${trailId}/`;

    const trailResponse = await fetch(apiUrlTrail, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.user.token}`,
        "Content-Type": "application/json",
      },
    });

    if (!trailResponse.ok) {
      throw new Error(`Error fetching trail: ${trailResponse.statusText}`);
    }

    const trailData = await trailResponse.json();

    console.log(trailData)

    // Parse the path if it's a JSON string
    if (trailData.path && typeof trailData.path === "string") {
      trailData.path = JSON.parse(trailData.path);
    }

    const trailWithAuthor = {
      ...trailData,
      author: trailData.createdBy ? `${trailData.createdBy.firstName} ${trailData.createdBy.lastName}` : "Unknown Author",
    };

    return NextResponse.json(trailWithAuthor, { status: 200 });
  } catch (error) {
    console.error("Error fetching trail:", error);
    return NextResponse.json({ message: "Error fetching trail" }, { status: 500 });
  }
}
