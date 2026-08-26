import { NextResponse } from "next/server";
import { Resend } from "resend";
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
 * Configuration:
 *   RESEND_API_KEY   an API key from resend.com (never hardcoded, read from env)
 */
export const runtime = "nodejs";

const CALLBACK_TO_EMAIL = "hello@proautokeys.co.uk";
const CALLBACK_FROM = "ProAutoKeys <noreply@proautokeys.co.uk>";

type Payload = {
  name?: unknown;
  phone?: unknown;
  reg?: unknown;
  detail?: unknown;
  town?: unknown;
  email?: unknown;
  /** Honeypot: real visitors never see or fill this field. */
  company?: unknown;
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

  // Honeypot: bots tend to fill in every field they find. A real visitor
  // never sees this one, so anything in it means "pretend it worked and
  // drop it" rather than tipping the bot off with an error.
  if (asText(body.company) !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = asText(body.name, 120);
  const phone = asText(body.phone, 40);
  const reg = asText(body.reg, 16);
  const detail = asText(body.detail, 500);
  const town = asText(body.town, 80) || "unknown page";
  const email = asText(body.email, 200);

  if (name === "" || phone === "") {
    return NextResponse.json(
      { error: "A name and a phone number are required." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "[callback] RESEND_API_KEY is not set — enquiry not delivered:",
      { name, phone, reg, detail, town },
    );
    return NextResponse.json(
      { error: "Callbacks are not configured." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);

  const lines = [
    `Name:   ${name}`,
    `Phone:  ${phone}`,
    `Reg:    ${reg || "not given"}`,
    `Issue:  ${detail || "not given"}`,
    `Town:   ${town}`,
  ].join("\n");

  try {
    const { error } = await resend.emails.send({
      from: CALLBACK_FROM,
      to: CALLBACK_TO_EMAIL,
      // Only set when we actually have a customer email to reply to —
      // a phone-only enquiry has nothing to attach it to, so it's omitted.
      ...(email ? { replyTo: email } : {}),
      subject: `New callback request — ${name} — ${town}`,
      text: `${lines}\n\nSubmitted from the ${town} page on the ${BRAND} website. Business line: ${PHONE_DISPLAY}`,
    });

    if (error) {
      console.error("[callback] Resend rejected the request:", error);
      return NextResponse.json(
        { error: "Could not send the enquiry." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[callback] Failed to send via Resend:", err);
    return NextResponse.json(
      { error: "Could not send the enquiry." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
