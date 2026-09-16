import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev"; // swap once your domain is verified
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "deveshsharma.it23@gmail.com";

export async function sendContactNotification({ name, email, phone, message }) {
  if (!process.env.RESEND_API_KEY) {
    console.log("[email skipped - no RESEND_API_KEY set] Contact form:", { name, email, phone, message });
    return;
  }

  await resend.emails.send({
    from: FROM_EMAIL,
    to: NOTIFY_EMAIL,
    reply_to: email,
    subject: `New contact form submission from ${name}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "—"}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });
}

export async function sendNewsletterConfirmation(email) {
  if (!process.env.RESEND_API_KEY) {
    console.log("[email skipped - no RESEND_API_KEY set] Newsletter signup:", email);
    return;
  }

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "You're subscribed to Shree Garud IT Solutions updates",
    html: `<p>Thanks for subscribing! You'll get occasional updates on offers and new services.</p>`,
  });
}

export async function sendOrderNotification(order, items) {
  if (!process.env.RESEND_API_KEY) {
    console.log("[email skipped - no RESEND_API_KEY set] New order:", order.id);
    return;
  }

  const itemsHtml = items.map((i) => `<li>${i.quantity} — ${i.notes || ""}</li>`).join("");

  await resend.emails.send({
    from: FROM_EMAIL,
    to: NOTIFY_EMAIL,
    reply_to: order.customer_email,
    subject: `New order request #${order.id} from ${order.customer_name}`,
    html: `
      <p><strong>Customer:</strong> ${order.customer_name} (${order.customer_email}, ${order.customer_phone || "—"})</p>
      <p><strong>Items:</strong></p>
      <ul>${itemsHtml}</ul>
    `,
  });
}
