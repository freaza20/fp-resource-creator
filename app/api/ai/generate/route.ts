import { NextResponse } from "next/server";

import { generateResource } from "@/lib/ai/resource-generator";
import {
  parseAIResourceApiRequest,
  validateApiGenerationRequest,
} from "@/lib/ai/request-validation";
import type { AIResourceApiResponse } from "@/lib/ai/types";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const payload = parseAIResourceApiRequest(body);

    if (!payload) {
      return NextResponse.json<AIResourceApiResponse>(
        {
          ok: false,
          error: {
            code: "invalid-request",
            message: "La petición de generación no tiene un formato válido.",
          },
        },
        { status: 400 },
      );
    }

    const validation = validateApiGenerationRequest(payload);

    if (!validation.valid) {
      return NextResponse.json<AIResourceApiResponse>(
        {
          ok: false,
          error: {
            code: validation.errors.some((error) =>
              error.includes("límite") || error.includes("teléfono"),
            )
              ? "usage-limit"
              : "invalid-request",
            message: validation.errors.join(" "),
          },
        },
        { status: 422 },
      );
    }

    const response = await generateResource(payload.request);

    return NextResponse.json<AIResourceApiResponse>({
      ok: true,
      data: response,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "No se pudo completar la generación IA.";

    return NextResponse.json<AIResourceApiResponse>(
      {
        ok: false,
        error: {
          code: "provider-error",
          message,
        },
      },
      { status: 500 },
    );
  }
}
