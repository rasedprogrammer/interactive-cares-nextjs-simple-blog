import ConnectDB from "@/lib/config/db";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { id } = params; // dynamic route: [id]

  try {
    await ConnectDB(); // connect to MongoDB via Mongoose

    const body = await req.json();
    const updateData = {};

    // Validate and assign role if present
    if (body.role) {
      const validRoles = ["user", "admin", "superadmin"];
      if (!validRoles.includes(body.role)) {
        return NextResponse.json({ message: "Invalid role" }, { status: 400 });
      }
      updateData.role = body.role;
    }

    // Validate and assign status if present
    if (body.status) {
      const validStatuses = ["active", "suspended"];
      if (!validStatuses.includes(body.status)) {
        return NextResponse.json(
          { message: "Invalid status" },
          { status: 400 }
        );
      }
      updateData.status = body.status;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: "Nothing to update" },
        { status: 400 }
      );
    }

    const user = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User updated", user },
      { status: 200 }
    );
  } catch (err) {
    console.error("PATCH /api/users/[id] error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
