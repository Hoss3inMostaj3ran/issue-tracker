import authOptions from "@/app/auth/authOptions";
import { issueSchema, patchIssueSchema } from "@/app/issueSchema";
import prisma from "@/prisma/client";
import { error } from "console";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await req.json();
  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    return NextResponse.json(
      { error: "The issue is not founded!" },
      { status: 404 }
    );
  }

  let updateData: any = {
    title: body.title,
    description: body.description,
  };

  if (body.userId !== null) {
    // enusure to user exist
    const user = await prisma.user.findUnique({
      where: {
        id: body.userId,
      },
    });
    if (!user) {
      return NextResponse.json(
        { error: "The specified user does not exist!" },
        { status: 404 }
      );
    }
    // If user exists, update the assignedUser field
    updateData["userId"] = body.userId;
  } else {
    // finally if userId is null we should unassigned
    updateData["userId"] = null;
  }

  const updateIssue = await prisma.issue.update({
    where: {
      id: issue.id,
    },
    data: updateData,
  });

  return NextResponse.json(updateIssue, { status: 201 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issue)
    return NextResponse.json(
      { error: "The Issue NotFounded!" },
      { status: 404 }
    );

  await prisma.issue.delete({
    where: { id: issue.id },
  });
  return NextResponse.json({});
}
