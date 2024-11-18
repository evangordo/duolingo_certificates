import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  const { username } = params;

  if (!username) {
    return NextResponse.json({ error: "no user" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://www.duolingo.com/2017-06-30/users?username=${username}`
    );
    const data = await response.json();
    console.log("user data", data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("error fetching data", error);

    return NextResponse.json(
      { error: "failed to fetch data from Duolingo" },
      { status: 500 }
    );
  }
}
