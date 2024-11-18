import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ username: string }> }
) {
  const username = await (await context.params).username;

  if (!username) {
    return NextResponse.json({ error: "no user" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://www.duolingo.com/2017-06-30/users?username=${username}`
    );
    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("error fetching data", error);

    return NextResponse.json(
      { error: "failed to fetch data from Duolingo" },
      { status: 500 }
    );
  }
}
