export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};
  const trimmedName = typeof name === 'string' ? name.trim() : '';
  const trimmedEmail = typeof email === 'string' ? email.trim() : '';
  const trimmedMessage = typeof message === 'string' ? message.trim() : '';

  if (
    !trimmedName ||
    trimmedName.length > 100 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail) ||
    trimmedMessage.length < 10 ||
    trimmedMessage.length > 4000
  ) {
    return res.status(400).json({ error: 'Invalid form data' });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Telegram contact endpoint is missing required environment variables');
    return res.status(500).json({ error: 'Contact form is not configured' });
  }

  const text = [
    'New message from the portfolio',
    '',
    `Name: ${trimmedName}`,
    `Email: ${trimmedEmail}`,
    `Message: ${trimmedMessage}`
  ].join('\n');

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text })
    });
    const telegramResult = await telegramResponse.json();

    if (!telegramResponse.ok || telegramResult.ok !== true) {
      console.error('Telegram rejected a contact form message');
      return res.status(502).json({ error: 'Message delivery failed' });
    }
  } catch {
    console.error('Telegram contact form request failed');
    return res.status(502).json({ error: 'Message delivery failed' });
  }

  return res.status(200).json({ ok: true });
}
