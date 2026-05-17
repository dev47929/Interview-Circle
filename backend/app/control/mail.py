import smtplib
import ssl
from email.message import EmailMessage
from bin.config import GMAIL_ADDRESS, GMAIL_APP_PASSWORD, SMTP_SERVER, SMTP_PORT


from email.message import EmailMessage
import smtplib
import ssl
import os
from typing import List, Optional, Union


def send_email(subject: str, body: str, to_email: str) -> bool:
    try:
        pdf_path = "data/report.pdf"

        msg = EmailMessage()
        msg["Subject"] = subject
        msg["From"] = GMAIL_ADDRESS
        msg["To"] = to_email

        # Plain text fallback
        msg.set_content(body)

        # HTML email
        html_body = f"""
        <html>
            <body>
                <h2>Weekly Complaint Report</h2>
                <p>Hello,</p>

                <p>Please find attached the <b>weekly complaint report PDF</b>.</p>

                <p>
                    This report contains the latest complaint analytics,
                    summaries, and system insights.
                </p>

                <br>
                <p>Regards,</p>
                <p><b>Complaint Management System</b></p>
            </body>
        </html>
        """

        msg.add_alternative(html_body, subtype="html")

        # PDF attachment
        if not os.path.exists(pdf_path):
            raise FileNotFoundError(f"PDF not found at {pdf_path}")

        with open(pdf_path, "rb") as f:
            pdf_data = f.read()

        msg.add_attachment(
            pdf_data,
            maintype="application",
            subtype="pdf",
            filename="weekly_report.pdf"
        )

        context = ssl.create_default_context()

        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls(context=context)
            server.login(GMAIL_ADDRESS, GMAIL_APP_PASSWORD)
            server.send_message(msg)

        return True

    except Exception as e:
        print(f"Email send error: {e}")
        return False
    
    

def send_email_otp(email: str, otp: str) -> bool:
    print(f"OTP send : {email} , : {otp}")
    subject = "Your OTP Code"
    body = f"""
Your OTP Code is: {otp}

This OTP will expire soon.
If you did not request this, ignore this email.
"""

    return send_email(subject, body, email)


# def send_email_otp(email: str, otp: str) -> bool:
#     print(f"OTP send : {email} , : {otp}")
#     return True


# send_email_otp("atharvthakre37@gmail.com", "123456")
