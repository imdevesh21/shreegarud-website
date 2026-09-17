import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev"; // swap once your domain is verified
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "sales@shreegarud.com";

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

const STATUS_MESSAGES = {
  approved: "Good news — your order has been approved and we're getting it ready.",
  rejected: "Unfortunately, we're unable to fulfill this order request.",
  processing: "Your order is now being processed.",
  dispatched: "Your order has been dispatched and is on its way.",
  completed: "Your order has been completed. Thank you for choosing us!",
};

export async function sendOrderStatusUpdate(order, note) {
  if (!process.env.RESEND_API_KEY) {
    console.log("[email skipped - no RESEND_API_KEY set] Order status update:", order.id, order.status);
    return;
  }

  const statusMessage = STATUS_MESSAGES[order.status] || `Your order status has been updated to: ${order.status}`;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: order.customer_email,
    subject: `Update on your order #${order.id} — Shree Garud IT Solutions`,
    html: `
      <p>Hi ${order.customer_name},</p>
      <p>${statusMessage}</p>
      ${note ? `<p><strong>Note from our team:</strong> ${note}</p>` : ""}
      <p>Order #: ${order.id}</p>
      <p>If you have any questions, just reply to this email or reach out to us at ${NOTIFY_EMAIL}.</p>
      <p>Thank you,<br/>Shree Garud IT Solutions</p>
    `,
  });
}
