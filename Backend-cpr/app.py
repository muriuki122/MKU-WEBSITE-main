import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message
from twilio.rest import Client
from dotenv import load_dotenv
import re

load_dotenv()

app = Flask(__name__)
CORS(app)  # allow frontend requests

# Mail configuration
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS', 'True') == 'True'
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER')

mail = Mail(app)

# Twilio client (optional)
twilio_client = None
if os.getenv('TWILIO_ACCOUNT_SID'):
    twilio_client = Client(os.getenv('TWILIO_ACCOUNT_SID'), os.getenv('TWILIO_AUTH_TOKEN'))

# Helper to send WhatsApp message
def send_whatsapp_alert(message_body):
    if twilio_client:
        try:
            twilio_client.messages.create(
                body=message_body,
                from_=os.getenv('TWILIO_WHATSAPP_FROM'),
                to=os.getenv('TWILIO_WHATSAPP_TO')
            )
        except Exception as e:
            print(f"WhatsApp error: {e}")

# Helper to send email
def send_email(to, subject, body, is_html=False):
    msg = Message(subject, recipients=[to])
    if is_html:
        msg.html = body
    else:
        msg.body = body
    mail.send(msg)

# ---------- Contact endpoint ----------
@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json()
    required = ['firstName', 'lastName', 'email', 'subject', 'message']
    for field in required:
        if not data.get(field):
            return jsonify({'error': f'{field} is required'}), 400

    first = data['firstName'].strip()
    last = data['lastName'].strip()
    email = data['email'].strip()
    subject = data['subject']
    message = data['message'].strip()
    phone = data.get('phone', '')
    org = data.get('organization', '')

    # Email validation
    if not re.match(r'[^@]+@[^@]+\.[^@]+', email):
        return jsonify({'error': 'Invalid email address'}), 400

    # Admin email content
    admin_body = f"""
    New contact message from {first} {last}
    Email: {email}
    Phone: {phone}
    Organization: {org}
    Subject: {subject}
    Message: {message}
    """
    send_email(os.getenv('ADMIN_EMAIL'), f'Contact: {subject}', admin_body)

    # Auto-reply to user
    user_body = f"""
    Dear {first},

    Thank you for reaching out to the MKU Centre for Placenta Research.
    We have received your message and will respond within 24 hours.

    Your message:
    {message}

    Best regards,
    MKU CPR Team
    """
    send_email(email, 'We received your message', user_body)

    # WhatsApp alert (optional)
    send_whatsapp_alert(f"New contact from {first} {last} - {subject}")

    return jsonify({'success': True, 'message': 'Message sent successfully'}), 200

# ---------- Donation endpoint ----------
@app.route('/api/donate', methods=['POST'])
def donate():
    data = request.get_json()
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    amount = data.get('amount', 0)
    message = data.get('message', '')

    if not name or not email or not amount:
        return jsonify({'error': 'Name, email and amount are required'}), 400

    # Send notification to admin
    admin_body = f"""
    Donation from {name}
    Email: {email}
    Amount: ${amount}
    Message: {message}
    """
    send_email(os.getenv('ADMIN_EMAIL'), 'New donation received', admin_body)

    # Thank-you email to donor
    thank_body = f"""
    Dear {name},

    Thank you for your generous donation of ${amount} to the MKU Centre for Placenta Research.
    Your support helps us advance maternal health research and save lives in Africa.

    If you have any questions, please contact us.
    """
    send_email(email, 'Thank you for your donation', thank_body)

    # Optional: redirect user to payment gateway
    payment_url = os.getenv('PAYMENT_GATEWAY_URL', 'https://example.com/donate')
    # In real scenario, you might return a redirect URL or process payment via M-Pesa/Stripe.
    # Here we just confirm donation intent.
    return jsonify({
        'success': True,
        'message': 'Donation recorded. Please complete payment using the link below.',
        'payment_url': payment_url
    }), 200

# ---------- Newsletter signup ----------
newsletter_emails = []  # In production, store in DB. For demo we keep in memory.
@app.route('/api/newsletter', methods=['POST'])
def newsletter():
    data = request.get_json()
    email = data.get('email', '').strip()
    if not email or not re.match(r'[^@]+@[^@]+\.[^@]+', email):
        return jsonify({'error': 'Valid email required'}), 400

    if email not in newsletter_emails:
        newsletter_emails.append(email)
        # Send welcome email
        welcome_body = f"""
        Thank you for subscribing to MKU CPR newsletter!
        You will receive the latest research news and events.
        """
        send_email(email, 'Welcome to MKU CPR newsletter', welcome_body)
        # Notify admin
        send_email(os.getenv('ADMIN_EMAIL'), 'New newsletter subscriber', email)

    return jsonify({'success': True, 'message': 'Subscribed successfully'}), 200

# ---------- Health check ----------
@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)