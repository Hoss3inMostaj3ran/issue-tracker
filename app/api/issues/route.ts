import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { z } from "zod";

const createIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is Required!")
    .max(255, "This title is too long, use shorter title"),

  description: z.string().min(1, "Description is Requiered!"),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const issue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(issue, { status: 201 });
}
