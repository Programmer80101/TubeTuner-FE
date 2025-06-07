import {NextResponse} from "next/server";

export async function POST() {
  try {
    const deployHookUrl = process.env.RENDER_DEPLOY_HOOK_URL;
    if (!deployHookUrl) {
      return NextResponse.json(
        {error: "Deploy hook URL not configured"},
        {status: 500}
      );
    }

    const res = await fetch(deployHookUrl, {method: "POST"});

    if (!res.ok) {
      return NextResponse.json(
        {error: "Failed to trigger deploy"},
        {status: 500}
      );
    }

    return NextResponse.json(
      {message: "Deployment triggered successfully"},
      {status: 200}
    );
  } catch {
    return NextResponse.json({error: "Internal server error"}, {status: 500});
  }
}
