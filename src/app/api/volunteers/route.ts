import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import nodemailer from 'nodemailer';

// Generate a random temporary password
function generateTempPassword(length = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, dob, gender, occupation, hasExperience, message } = data;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists.' }, { status: 409 });
    }

    const tempPassword = generateTempPassword();

    // Create the volunteer user
    const newUser = new User({
      name,
      email,
      password: tempPassword, // Hashed in a real-world scenario
      role: 'trust_member',
      isVolunteer: true,
      mustChangePassword: true,
      phone,
      dob,
      gender,
      occupation,
      hasExperience,
      // store message somewhere? Could be added to bio or a separate ContactRequest if needed
    });

    await newUser.save();

    // Setup nodemailer to send email (Using Ethereal for testing)
    // Create a test account on ethereal.email
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const info = await transporter.sendMail({
      from: '"Helping Hands Team" <noreply@helpinghands.org>',
      to: email,
      subject: 'Welcome to Helping Hands - Volunteer Account Created',
      text: `Hello ${name},\n\nThank you for volunteering with us!\n\nAn account has been provisioned for you.\nYour temporary password is: ${tempPassword}\n\nPlease login to the dashboard and you will be prompted to change your password.\n\nBest Regards,\nHelping Hands Team`,
      html: `
        <h3>Hello ${name},</h3>
        <p>Thank you for volunteering with us!</p>
        <p>An account has been provisioned for you.</p>
        <p>Your temporary password is: <strong>${tempPassword}</strong></p>
        <p>Please login to the dashboard and you will be prompted to change your password.</p>
        <br />
        <p>Best Regards,</p>
        <p>Helping Hands Team</p>
      `,
    });

    console.log('Volunteer provisioned:', email);
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    return NextResponse.json({ 
      success: true, 
      message: 'Account created successfully', 
      emailUrl: nodemailer.getTestMessageUrl(info) // For easy testing access
    }, { status: 201 });

  } catch (error) {
    console.error('Error provisioning volunteer:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
