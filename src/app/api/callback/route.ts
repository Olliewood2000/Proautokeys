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

/** Bare-minimum escaping — every value we interpolate is short, user-typed
 *  text, never trusted markup. */
const esc = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

type Enquiry = {
  name: string;
  phone: string;
  reg: string;
  detail: string;
  town: string;
};

/**
 * Table-based layout with every style inlined — the only markup that survives
 * Outlook, Gmail's CSS stripping and dark-mode re-colouring intact. Brand
 * colours are pulled by value from globals.css rather than imported, since
 * this never runs through Tailwind.
 */
function buildEmailHtml({ name, phone, reg, detail, town }: Enquiry): string {
  const ink = "#14181c";
  const red = "#c8102e";
  const shell = "#f2f4f6";
  const line = "#e3e7eb";
  const slate = "#5c6773";
  const telHref = `tel:${phone.replace(/[^\d+]/g, "")}`;

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:14px 0;border-top:1px solid ${line};font:600 13px/1.4 Arial,Helvetica,sans-serif;color:${slate};width:130px;vertical-align:top;">
        ${esc(label)}
      </td>
      <td style="padding:14px 0;border-top:1px solid ${line};font:400 16px/1.5 Arial,Helvetica,sans-serif;color:${ink};vertical-align:top;">
        ${value}
      </td>
    </tr>`;

  const regCell = reg
    ? `<span style="display:inline-block;background:#f7d117;color:#101010;font:700 15px/1 'Courier New',Courier,monospace;letter-spacing:0.08em;padding:6px 10px;border-radius:4px;">${esc(reg)}</span>`
    : `<span style="color:${slate};">Not given</span>`;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New callback request</title>
  </head>
  <body style="margin:0;padding:24px 12px;background:${shell};font:400 16px/1.5 Arial,Helvetica,sans-serif;color:${ink};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background:#ffffff;border-radius:10px;overflow:hidden;">
            <tr>
              <td style="background:${ink};padding:24px 32px;">
                <div style="font:700 18px/1 Arial,Helvetica,sans-serif;letter-spacing:-0.01em;">
                  <span style="color:${red};">PRO</span><span style="color:#ffffff;">autokeys</span>
                </div>
                <div style="margin-top:6px;font:400 13px/1.4 Arial,Helvetica,sans-serif;color:rgba(255,255,255,0.6);">
                  Mobile auto locksmith
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:28px 32px 8px;">
                <div style="display:inline-block;background:${red};color:#ffffff;font:700 12px/1 Arial,Helvetica,sans-serif;letter-spacing:0.04em;text-transform:uppercase;padding:6px 10px;border-radius:999px;">
                  New callback request
                </div>
                <h1 style="margin:14px 0 0;font:700 24px/1.25 Arial,Helvetica,sans-serif;letter-spacing:-0.01em;color:${ink};">
                  ${esc(name)}
                </h1>
                <p style="margin:4px 0 0;font:400 14px/1.4 Arial,Helvetica,sans-serif;color:${slate};">
                  Submitted from the <strong style="color:${ink};">${esc(town)}</strong> page
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:8px 32px 4px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  ${row("Name", esc(name))}
                  ${row("Phone", `<a href="${telHref}" style="color:${ink};font-weight:700;text-decoration:none;">${esc(phone)}</a>`)}
                  ${row("Reg", regCell)}
                  ${row("Issue", esc(detail) || `<span style="color:${slate};">Not given</span>`)}
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 32px 32px;">
                <a href="${telHref}" style="display:inline-block;background:${ink};color:#ffffff;font:700 15px/1 Arial,Helvetica,sans-serif;padding:14px 22px;border-radius:8px;text-decoration:none;">
                  Call ${esc(name.split(" ")[0] || "back")} now
                </a>
              </td>
            </tr>

            <tr>
              <td style="padding:18px 32px;background:${shell};border-top:1px solid ${line};">
                <p style="margin:0;font:400 12px/1.5 Arial,Helvetica,sans-serif;color:${slate};">
                  Sent automatically from the ${esc(BRAND)} website callback form. Business line: ${PHONE_DISPLAY}.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildEmailText({ name, phone, reg, detail, town }: Enquiry): string {
  const lines = [
    `Name:   ${name}`,
    `Phone:  ${phone}`,
    `Reg:    ${reg || "not given"}`,
    `Issue:  ${detail || "not given"}`,
    `Town:   ${town}`,
  ].join("\n");

  return `${lines}\n\nSubmitted from the ${town} page on the ${BRAND} website. Business line: ${PHONE_DISPLAY}`;
}

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
  const enquiry: Enquiry = { name, phone, reg, detail, town };

  try {
    const { error } = await resend.emails.send({
      from: CALLBACK_FROM,
      to: CALLBACK_TO_EMAIL,
      // Only set when we actually have a customer email to reply to —
      // a phone-only enquiry has nothing to attach it to, so it's omitted.
      ...(email ? { replyTo: email } : {}),
      subject: `New callback request — ${name} — ${town}`,
      html: buildEmailHtml(enquiry),
      text: buildEmailText(enquiry),
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
