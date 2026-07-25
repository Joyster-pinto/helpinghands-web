import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ success: false, error: 'Please provide all required fields.' }, { status: 400 });
    }

    // Save contact query into MongoDB Atlas
    await connectToDatabase();
    const contactRecord = await Contact.create({
      name,
      email,
      phone,
      subject: subject || 'General Inquiry',
      message,
      status: 'new',
      createdAt: new Date(),
    });

    const refId = `HH-INQ-${contactRecord._id.toString().substring(18).toUpperCase()}`;

    // Log simulated user confirmation email & SMS notification + admin alert
    console.log(`[EMAIL CONFIRMATION TO USER] Sent to ${email}: "Dear ${name}, thank you for contacting Helping Hands Team Trust! Ref ID: ${refId}. Our core committee will reach out to you within 24 hours."`);
    console.log(`[SMS NOTIFICATION TO USER] Sent to ${phone}: "Helping Hands Trust: Hello ${name}, we received your message regarding '${subject}'. Ref: ${refId}."`);
    console.log(`[ADMIN NOTIFICATION ALERT] Sent to admin@helpinghands-team.org: "New Contact Query from ${name} (${email}, ${phone}). Subject: ${subject}. Message: ${message}"`);

    return NextResponse.json({ 
      success: true, 
      refId,
      message: `Thank you ${name}! Your query has been recorded under Ref ${refId}. A confirmation email and SMS notification have been sent to ${email} / ${phone}. Our team will contact you shortly.`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to send message.' }, { status: 500 });
  }
}
