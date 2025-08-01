"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function getChatState() {
  const cookieStore = await cookies();
  return {
    isChatOpen: cookieStore.get("chatOpen")?.value === "true",
    chatPanelSize: parseInt(cookieStore.get("chatPanelSize")?.value || "35"),
  };
}

export async function toggleChatAction(pathname: string) {
  const cookieStore = await cookies();
  const current = cookieStore.get("chatOpen")?.value === "true";

  cookieStore.set("chatOpen", String(!current), {
    httpOnly: false, // Allow client access for animations
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  revalidatePath(pathname);
}

export async function updateChatPanelSize(size: number, pathname: string) {
  const cookieStore = await cookies();

  cookieStore.set("chatPanelSize", String(size), {
    httpOnly: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  revalidatePath(pathname);
}
