import React, { useState } from "react";
import { contact, images, paymentDetails } from "./content.js";

function CopyButton({ value, label, onCopied }) {
  async function copyValue() {
    try {
      await navigator.clipboard.writeText(value);
      onCopied("Copied to clipboard.");
    } catch {
      onCopied("Copy was unavailable. Select and copy the payment detail manually.");
    }
  }

  return (
    <button className="copy-button" type="button" onClick={copyValue}>
      {label}
    </button>
  );
}

function BankRow({ label, children }) {
  return (
    <div className="bank-row">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export default function DonationPage() {
  const [copyStatus, setCopyStatus] = useState("");

  return (
    <>
      <header className="donate-topbar">
        <div className="wrap donate-topbar-inner">
          <a className="brand" href="/" aria-label="Imdad-ul-Fuqaraa Trust home">
            <img src={images.logo} alt="" />
            <span>Imdad-ul-Fuqaraa Trust</span>
          </a>
          <a className="back-link" href="/">
            ← Back to IFT
          </a>
        </div>
      </header>
      <main className="donate-main">
        <div className="wrap">
          <header className="donate-intro">
            <p className="eyebrow">Your support matters</p>
            <h1>Give with care.</h1>
            <p>
              Use the phone-number option only if your payment app supports it,
              or make a bank transfer. Before confirming, check that the
              recipient name shown by your payment app matches{" "}
              <strong>{paymentDetails.accountName}</strong>.
            </p>
          </header>
          <div className="donation-options">
            <section className="donation-option" aria-labelledby="upi-heading">
              <div className="donation-option-heading">
                <h2 id="upi-heading">Google Pay / PhonePe</h2>
                <img
                  className="payment-logo"
                  src="/images/gpay-phonepe.jpg"
                  alt="Google Pay and PhonePe"
                />
              </div>
              <p>
                This is the phone number supplied by the trust, not a verified
                UPI ID. If your app supports mobile-number payments, enter it
                and confirm the recipient name before sending. Otherwise,
                contact the trust to confirm the right payment method.
              </p>
              <div className="payment-phone">
                <strong>{paymentDetails.upiPhone}</strong>
                <CopyButton
                  value={paymentDetails.upiPhone.replace(/\s/g, "")}
                  label="Copy number"
                  onCopied={setCopyStatus}
                />
              </div>
              <ol className="payment-steps">
                <li>Open Google Pay or PhonePe.</li>
                <li>Choose mobile-number payment only if your app supports it.</li>
                <li>
                  Enter <strong>{paymentDetails.upiPhone}</strong> and verify
                  the trust’s name.
                </li>
                <li>Review the amount and recipient before confirming.</li>
              </ol>
              <p className="copy-status" aria-live="polite">
                {copyStatus}
              </p>
            </section>

            <section className="donation-option" aria-labelledby="bank-heading">
              <div className="donation-option-heading">
                <h2 id="bank-heading">Bank transfer</h2>
                <img
                  className="payment-logo hdfc-logo"
                  src="/images/hdfc-logo.png"
                  alt="HDFC Bank"
                />
              </div>
              <dl className="bank-list">
                <BankRow label="Account name">{paymentDetails.accountName}</BankRow>
                <BankRow label="Account number">
                  <span>{paymentDetails.accountNumber}</span>
                  <CopyButton
                    value={paymentDetails.accountNumber}
                    label="Copy"
                    onCopied={setCopyStatus}
                  />
                </BankRow>
                <BankRow label="Account type">{paymentDetails.accountType}</BankRow>
                <BankRow label="IFSC">
                  <span>{paymentDetails.ifsc}</span>
                  <CopyButton
                    value={paymentDetails.ifsc}
                    label="Copy"
                    onCopied={setCopyStatus}
                  />
                </BankRow>
                <BankRow label="Bank">{paymentDetails.bank}</BankRow>
                <BankRow label="Branch">{paymentDetails.branch}</BankRow>
              </dl>
            </section>
          </div>
          <p className="payment-safety">
            Please confirm these payment details with the trust before
            transferring. In your payment app, stop if the displayed recipient
            name does not match the trust. Keep your payment confirmation for
            your records.
          </p>
          <div className="donate-contact-actions">
            <a
              className="button"
              href={`https://wa.me/${contact.phoneDigits}`}
              target="_blank"
              rel="noreferrer"
            >
              Confirm on WhatsApp ↗
            </a>
            <a
              className="button button-outline"
              href={`mailto:${contact.email}?subject=Donation%20enquiry`}
            >
              Ask a question
            </a>
          </div>
        </div>
      </main>
      <footer className="donate-footer">
        <div className="wrap">Imdad-ul-Fuqaraa Trust · Hyderabad, Telangana</div>
      </footer>
    </>
  );
}
