import { NextResponse } from "next/server";
import { BRAND, PHONE_DISPLAY } from "@/data/towns";

/**
 * Callback requests.
 *
 * The important property here is that this route never returns 200 unless the
 * enquiry has actually gone somewhere a human will see. A form that reports
 * success and quietly drops the lead is worse than no form at all, so a
 * missing or broken email configuration returns an error and the page tells
 * the visitor to ring instead.
 *
 * Configuration, both required:
 *   RESEND_API_KEY    an API key from resend.com
 *   CALLBACK_TO_EMAIL where enquiries should land
 *   CALLBACK_FROM_EMAIL  optional; must be on a domain verified with Resend.
 *                        Defaults to Resend's shared testing sender.
 */
export const runtime = "nodejs";

type Payload = {
  name?: unknown;
  phone?: unknown;
  reg?: unknown;
  detail?: unknown;
};

const asText = (value: unknown, max = 300): string =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const name = asText(body.name, 120);
  const phone = asText(body.phone, 40);
  const reg = asText(body.reg, 16);
  const detail = asText(body.detail, 500);

  if (name === "" || phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json(
      { error: "A name and a usable phone number are required." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CALLBACK_TO_EMAIL;

  if (!apiKey || !to) {
    console.error(
      "[callback] RESEND_API_KEY or CALLBACK_TO_EMAIL is not set — enquiry not delivered:",
      { name, phone, reg, detail },
    );
    return NextResponse.json(
      { error: "Callbacks are not configured." },
      { status: 503 },
    );
  }

  const lines = [
    `Name:   ${name}`,
    `Phone:  ${phone}`,
    `Reg:    ${reg || "not given"}`,
    `Issue:  ${detail || "not given"}`,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CALLBACK_FROM_EMAIL ?? "onboarding@resend.dev",
      to,
      // The phone number is in the subject so it can be actioned from a
      // notification without opening anything.
      subject: `${BRAND} callback — ${name}, ${phone}`,
      reply_to: to,
      text: `${lines}\n\nSent from the ${BRAND} website. Business line: ${PHONE_DISPLAY}`,
    }),
  });

  if (!response.ok) {
    console.error(
      "[callback] Resend rejected the request:",
      response.status,
      await response.text(),
    );
    return NextResponse.json(
      { error: "Could not send the enquiry." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
