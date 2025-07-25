import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

interface RouteContext {
  params: {
    letter: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { letter } = params;

    // Validate the letter parameter
    if (!letter || !/^[A-Z]$/.test(letter.toUpperCase())) {
      return NextResponse.json(
        { error: "Invalid letter parameter. Must be A-Z." },
        { status: 400 }
      );
    }

    const upperLetter = letter.toUpperCase();

    // Path to the SVG file in the backend
    const svgPath = join(
      process.cwd(),
      "..",
      "backend",
      "TTS",
      "img",
      `${upperLetter}.svg`
    );

    try {
      const svgContent = await readFile(svgPath, "utf-8");
      return new NextResponse(svgContent, {
        status: 200,
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=31536000", // Cache for 1 year
        },
      });
    } catch (fileError) {
      console.error(
        `Error reading SVG file for letter ${upperLetter}:`,
        fileError
      );
      return NextResponse.json(
        { error: `SVG file not found for letter ${upperLetter}` },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error in signs API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
