"use client";

import React from "react";

/* Simple bubbles */
function SystemMessage({ text }) {
  return (
    <div style={{ fontSize: 12, color: "#334155", background: "#e2e8f0", padding: "6px 10px", borderRadius: 8, marginBottom: 10, width: "fit-content", maxWidth: "85%" }}>
      {text}
    </div>
  );
}
function BotMessage({ text }) {
  return (
    <div style={{ display: "flex", marginBottom: 10, gap: 8, alignItems: "flex-start" }}>
      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#1d4ed8", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flex: "0 0 auto" }}>
        B
      </div>
      <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", padding: "8px 12px", borderRadius: 12, color: "#0f172a", maxWidth: "80%", whiteSpace: "pre-wrap" }}>
        {text}
      </div>
    </div>
  );
}
function UserMessage({ text }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
      <div style={{ background: "#dbeafe", border: "1px solid #bfdbfe", padding: "8px 12px", borderRadius: 12, color: "#0f172a", maxWidth: "80%" }}>
        {text}
      </div>
    </div>
  );
}

/* UI helpers */
function PillButton({ label, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        border: "1px solid #e5e7eb",
        background: "#fff",
        color: "#0f172a",
        padding: "8px 12px",
        borderRadius: 999,
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: 14,
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {label}
    </button>
  );
}
function RowButtons({ items }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
      {items.map((it, idx) => (
        <PillButton key={idx} label={it.label} onClick={it.onClick} disabled={it.disabled} />
      ))}
    </div>
  );
}
function FieldRow({ label, value, onChange, type = "text", placeholder }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 12, color: "#475569", marginBottom: 6 }}>{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 10,
          border: "1px solid #e5e7eb",
          outline: "none",
          fontSize: 14,
          background: "#fff",
        }}
      />
    </div>
  );
}
function ReviewCard({ data }) {
  return (
    <div style={{ border: "1px solid #e5e7eb", background: "#ffffff", borderRadius: 12, padding: 12, color: "#0f172a", marginBottom: 12 }}>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>Review your details</div>
      <div style={{ fontSize: 14, lineHeight: 1.6 }}>
        <div><strong>Department:</strong> {data.department || "-"}</div>
        <div><strong>Name:</strong> {data.name || "-"}</div>
        <div><strong>Email:</strong> {data.email || "-"}</div>
        <div><strong>Phone:</strong> {data.phone || "-"}</div>
        <div><strong>Date:</strong> {data.date || "-"}</div>
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = React.useState(false);

  const Steps = React.useMemo(() => ({
    INIT: "INIT",
    SAID_HI: "SAID_HI",
    CHOOSING_LANG: "CHOOSING_LANG",
    CHOOSING_DEPT: "CHOOSING_DEPT",
    NAME: "NAME",
    EMAIL: "EMAIL",
    PHONE: "PHONE",
    DATE: "DATE",
    READY_REVIEW: "READY_REVIEW",
    REVIEW: "REVIEW",
    CONFIRMED: "CONFIRMED",
  }), []);
  const [language, setLanguage] = React.useState("en"); // 'en' for English, 'ta' for Tamil

  const translations = {
    en: {
      welcome: "Hi! Welcome to Salem Gopi Hospital.",
      getStarted: "To get started, please click the button below.\nTyping is disabled until you continue.",
      sayHi: "Say Hi to Continue",
      bookAppointment: "Book an Appointment",
      chooseDept: "Please choose a department:",
      typeFullName: "Please type your full name and press Enter:",
      typeEmail: "Thanks! Now type your email and press Enter:",
      typePhone: "Got it. Now type your phone number and press Enter:",
      selectDate: "Select a preferred date from the calendar below:",
      selectedDate: "Selected date:",
      continue: "Continue",
      reviewDetails: "Review Details",
      editDetails: "Edit details",
      editDetailsPrompt: "You can edit your details. Type your Name to proceed through each step.",
      confirmData: "Confirm your data",
      submitting: "Submitting...",
      appointmentSubmitted: "Thanks! Your appointment request has been submitted. Our team will reach out shortly.",
      submissionError: "Sorry, there was an error submitting your request. Please try again.",
      submissionSuccess: "Thanks! Your appointment request has been submitted. Our team will reach out shortly.",
      reviewYourDetails: "Review your details",
      department: "Department:",
      name: "Name:",
      email: "Email:",
      phone: "Phone:",
      date: "Date:",
      typeDisabled: "Type is disabled. Use the options above.",
      typeHere: "Type here and press Enter...",
      send: "Send",
      invalidEmail: "Please enter a valid email address.",
      invalidPhone: "Please enter a valid 10-digit phone number.",
      nephrology: "Nephrology",
      urology: "Urology",
      dialysis: "Dialysis",
      diabetesCare: "Diabetes Care",
      other: "Other",
      chooseLanguage: "Please choose your preferred language:",
      otherDeptPrompt: "Please type the department you are looking for and press Enter:",
    },
    ta: {
      welcome: "வணக்கம்! சேலம் கோபி மருத்துவமனைக்கு வரவேற்கிறோம்.",
      getStarted: "தொடங்குவதற்கு, கீழே உள்ள பொத்தானை கிளிக் செய்யவும்.\nநீங்கள் தொடரும் வரை தட்டச்சு செய்வது முடக்கப்பட்டுள்ளது.",
      sayHi: "வணக்கம் சொல்ல தொடரவும்",
      bookAppointment: "சந்திப்பு பதிவு செய்யவும்",
      chooseDept: "தயவுசெய்து ஒரு துறையைத் தேர்ந்தெடுக்கவும்:",
      typeFullName: "உங்கள் முழுப் பெயரைத் தட்டச்சு செய்து Enter ஐ அழுத்தவும்:",
      typeEmail: "நன்றி! இப்போது உங்கள் மின்னஞ்சலைத் தட்டச்சு செய்து Enter ஐ அழுத்தவும்:\n",
      typePhone: "புரிந்தது. இப்போது உங்கள் தொலைபேசி எண்ணைத் தட்டச்சு செய்து Enter ஐ அழுத்தவும்:",
      selectDate: "கீழே உள்ள காலெண்டரில் இருந்து விருப்பமான தேதியைத் தேர்ந்தெடுக்கவும்:",
      selectedDate: "தேர்ந்தெடுக்கப்பட்ட தேதி:",
      continue: "தொடரவும்",
      reviewDetails: "விவரங்களை மதிப்பாய்வு செய்யவும்",
      editDetails: "விவரங்களைத் திருத்தவும்",
      editDetailsPrompt: "உங்கள் விவரங்களைத் திருத்தலாம். ஒவ்வொரு படிநிலையிலும் தொடர புதுப்பிக்கப்பட்ட மதிப்பைத் தட்டச்சு செய்து Enter ஐ அழுத்தவும்.",
      confirmData: "உங்கள் தரவை உறுதிப்படுத்தவும்",
      submitting: "சமர்ப்பிக்கப்படுகிறது...",
      appointmentSubmitted: "நன்றி! உங்கள் சந்திப்பு கோரிக்கை சமர்ப்பிக்கப்பட்டுள்ளது. எங்கள் குழு விரைவில் உங்களைத் தொடர்பு கொள்ளும்.",
      submissionError: "மன்னிக்கவும், உங்கள் கோரிக்கையை சமர்ப்பிப்பதில் பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.",
      submissionSuccess: "நன்றி! உங்கள் சந்திப்பு கோரிக்கை சமர்ப்பிக்கப்பட்டுள்ளது. எங்கள் குழு விரைவில் உங்களைத் தொடர்பு கொள்ளும்.",
      reviewYourDetails: "உங்கள் விவரங்களை மதிப்பாய்வு செய்யவும்",
      department: "துறை:",
      name: "பெயர்:",
      email: "மின்னஞ்சல்:",
      phone: "தொலைபேசி:",
      date: "தேதி:",
      typeDisabled: "தட்டச்சு செய்வது முடக்கப்பட்டுள்ளது. மேலே உள்ள விருப்பங்களைப் பயன்படுத்தவும்.",
      typeHere: "இங்கே தட்டச்சு செய்து Enter ஐ அழுத்தவும்...",
      send: "அனுப்பு",
      nephrology: "சிறுநீரகவியல்",
      urology: "சிறுநீரக அறுவை சிகிச்சை",
      dialysis: "டயாலிசிஸ்",
      diabetesCare: "நீரிழிவு சிகிச்சை",
      other: "மற்றவை",
      chooseLanguage: "தயவுசெய்து உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்:",
      otherDeptPrompt: "நீங்கள் தேடும் துறையைத் தட்டச்சு செய்து Enter ஐ அழுத்தவும்:",
      invalidEmail: "சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்.",
      invalidPhone: "சரியான 10 இலக்க தொலைபேசி எண்ணை உள்ளிடவும்.",
    },
  };

  const t = translations[language];

  const [messages, setMessages] = React.useState([{ from: "bot", text: t.welcome }, { from: "system", text: t.getStarted }]);
  const [step, setStep] = React.useState(Steps.INIT);
  const [form, setForm] = React.useState({ department: "", name: "", email: "", phone: "", date: "" });
  const [sending, setSending] = React.useState(false);

  // Bottom input enabled only for name/email/phone steps, and when 'Other' department is selected
  const inputDisabled = ![Steps.NAME, Steps.EMAIL, Steps.PHONE].includes(step) && !(step === Steps.CHOOSING_DEPT && form.department === t.other);

  function pushBot(text) { setMessages((m) => [...m, { from: "bot", text }]); }
  function pushUser(text) { setMessages((m) => [...m, { from: "user", text }]); }

  function handleSayHi() {
    pushUser(t.sayHi);
    setStep(Steps.CHOOSING_LANG);
    setTimeout(() => pushBot(t.chooseLanguage), 40);
  }

  function handleChooseLanguage(lang) {
    setLanguage(lang);
    pushUser(lang === "en" ? "English" : "தமிழ்");
    setMessages([{ from: "bot", text: translations[lang].welcome }, { from: "system", text: translations[lang].getStarted }]);
    setStep(Steps.SAID_HI);
    setTimeout(() => pushBot(translations[lang].bookAppointment), 40);
  }
  function handleBookAppointment() {
    pushUser(t.bookAppointment);
    setStep(Steps.CHOOSING_DEPT);
    setTimeout(() => pushBot(t.chooseDept), 40);
  }
  function handleChooseDept(dept) {
    pushUser(dept);
    setForm((f) => ({ ...f, department: dept }));
    if (dept === t.other) {
      setTimeout(() => {
        pushBot(t.otherDeptPrompt);
        setStep(Steps.CHOOSING_DEPT); // Stay in CHOOSING_DEPT to allow typing for 'Other'
      }, 40);
    } else {
      setTimeout(() => {
        pushBot(t.typeFullName);
        setStep(Steps.NAME);
      }, 40);
    }
  }

  // User types in bottom box for these steps
  function onSend(text) {
    const v = text.trim();
    if (!v) return;

    if (step === Steps.NAME) {
      setForm((f) => ({ ...f, name: v }));
      pushUser(v);
      setTimeout(() => { pushBot(t.typeEmail); setStep(Steps.EMAIL); }, 40);
    } else if (step === Steps.EMAIL) {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(v)) {
        pushBot(t.invalidEmail);
        return;
      }
      setForm((f) => ({ ...f, email: v }));
      pushUser(v);
      setTimeout(() => { pushBot(t.typePhone); setStep(Steps.PHONE); }, 40);
    } else if (step === Steps.PHONE) {
      // Phone number validation (10 digits)
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(v)) {
        pushBot(t.invalidPhone);
        return;
      }
      setForm((f) => ({ ...f, phone: v }));
      pushUser(v);
      setTimeout(() => { pushBot(t.selectDate); setStep(Steps.DATE); }, 40);
    } else if (step === Steps.CHOOSING_DEPT && form.department === t.other) {
      setForm((f) => ({ ...f, department: v }));
      pushUser(v);
      setTimeout(() => { pushBot(t.typeFullName); setStep(Steps.NAME); }, 40);
    }
  }

  function allFilled(o) {
    return o.department && o.name && o.email && o.phone && o.date;
  }

  function confirmData() {
    setSending(true);
    const payload = {
      action: "book_appointment",
      data: { ...form },
      timestamp: new Date().toISOString(),
    };
    const WEBHOOK_URL = "https://zohoapis.in/creator/custom/syroex/Sgh_ChatBot_Data?publickey=yCjDRJFv7N7snxgfhdyARu6Qy&data="; // replace with real endpoint if needed

                const encodedJsonString = encodeURIComponent(JSON.stringify(payload));

      const apiUrl = WEBHOOK_URL + encodedJsonString;

            fetch(apiUrl, {
                method: 'GET',
                mode:"no-cors"
            })
            .then(() => {
                setTimeout(() => {
                    setSending(false);
                    pushBot(t.submissionSuccess);
                    setStep(Steps.CONFIRMED);
                }, 3000); // Show success message after 3 seconds
            })
            .catch((error) => {
                console.error("Submission error:", error);
                setSending(false);
                pushBot(t.submissionError);
            });
  }


  // Scroll to bottom on updates
  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, step, form]);

  function InteractiveBlock() {
    if (step === Steps.INIT)
      return <RowButtons items={[{ label: t.sayHi, onClick: handleSayHi }]} />;

    if (step === Steps.CHOOSING_LANG)
      return <RowButtons items={[{ label: "English", onClick: () => handleChooseLanguage("en") }, { label: "தமிழ்", onClick: () => handleChooseLanguage("ta") }]} />;

    if (step === Steps.SAID_HI)
      return <RowButtons items={[{ label: t.bookAppointment, onClick: handleBookAppointment }]} />;

    if (step === Steps.CHOOSING_DEPT && form.department !== t.other) {
      const opts = [t.nephrology, t.urology, t.dialysis, t.diabetesCare, t.other];
      return <RowButtons items={opts.map((d) => ({ label: d, onClick: () => handleChooseDept(d) }))} />;
    }

    // No inline fields for NAME/EMAIL/PHONE — user types at bottom input based on bot prompt

    if (step === Steps.DATE) {
      return (
        <div style={{ marginBottom: 8 }}>
          <FieldRow
            label={t.selectDate}
            type="date"
            value={form.date}
            onChange={(v) => setForm((f) => ({ ...f, date: v }))}
          />
          <RowButtons
            items={[
              {
                label: t.continue,
                onClick: () => {
                  if (!form.date) return;
                  pushUser(`${t.selectedDate} ${form.date}`);
                  setStep(Steps.READY_REVIEW);
                },
                disabled: !form.date,
              },
            ]}
          />
        </div>
      );
    }

    if (step === Steps.READY_REVIEW) {
      return (
        <RowButtons
          items={[
            {
              label: t.reviewDetails,
              onClick: () => {
                if (!allFilled(form)) return;
                setStep(Steps.REVIEW);
              },
              disabled: !allFilled(form),
            },
          ]}
        />
      );
    }

    if (step === Steps.REVIEW) {
      return (
        <div>
          <ReviewCard data={form} />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <PillButton
              label={t.editDetails}
              onClick={() => {
                setStep(Steps.NAME);
                pushBot(t.editDetailsPrompt);
              }}
            />
            <button
              onClick={confirmData}
              disabled={sending}
              style={{
                background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "10px 12px",
                cursor: sending ? "not-allowed" : "pointer",
                opacity: sending ? 0.7 : 1,
              }}
            >
              {sending ? t.submitting : t.confirmData}
            </button>
          </div>
        </div>
      );
    }

    return null;
  }

  return (
    <>
      {/* Floating Button */}
      <button
        aria-label="Open chat"
        onClick={() => setOpen((v) => !v)}
        style={{
          position: "fixed",
          right: "20px",
          bottom: "20px",
          zIndex: 1000,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          border: "none",
          background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #0ea5e9 100%)",
          color: "#fff",
          boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <i className="fa-solid fa-comments" style={{ fontSize: 22 }} />
      </button>

      {/* Chatbox */}
      <div
        style={{
          position: "fixed",
          right: "20px",
          bottom: open ? "20px" : "-600px", // Adjusted to hide completely
          zIndex: 1000,
          width: "min(360px, 92vw)",
          height: "600px",
          background: "#ffffff",
          borderRadius: "14px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.20), 0 6px 10px rgba(0,0,0,0.10)",
          overflow: "hidden",
          transition: "bottom 280ms ease",
          display: "flex",
          flexDirection: "column",
        }}
        aria-hidden={!open}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #0ea5e9 100%)",
            color: "#fff",
            padding: "12px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>
              SG
            </div>
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ fontWeight: 700 }}>Salem Gopi Hospital</div>
              <div style={{ fontSize: 12, opacity: 0.9 }}>Chat Support</div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close chat" style={{ background: "transparent", color: "#fff", border: "none", cursor: "pointer", fontSize: 18 }}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        {/* Messages + Interactive controls */}
        <div ref={scrollRef} style={{ flex: 1, background: "#f7fafc", padding: "12px", overflowY: "auto" }}>
          {messages.map((m, idx) =>
            m.from === "system" ? <SystemMessage key={idx} text={m.text} /> :
            m.from === "bot" ? <BotMessage key={idx} text={m.text} /> :
            <UserMessage key={idx} text={m.text} />
          )}

          <InteractiveBlock />
        </div>

        {/* Bottom input */}
        <BottomInput disabled={inputDisabled} onSend={onSend} placeholder={t.typeHere} />
      </div>
    </>
  );
}

function BottomInput({ disabled, onSend, placeholder }) {
  const [value, setValue] = React.useState("");

  function send() {
    if (disabled) return;
    const v = value.trim();
    if (!v) return;
    onSend(v);
    setValue("");
  }

  return (
    <div style={{ borderTop: "1px solid #e5e7eb", padding: "10px", background: "#ffffff", display: "flex", gap: 8, alignItems: "center" }}>
      <input
        value={value}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
        placeholder={disabled ? "Type is disabled. Use the options above." : placeholder}
        style={{ flex: 1, padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", outline: "none", fontSize: 14, background: disabled ? "#f1f5f9" : "#fff" }}
      />
      <button
        onClick={send}
        disabled={disabled}
        aria-label="Send message"
        style={{
          background: "linear-gradient(135deg, #0ea5e9 0%, #1d4ed8 100%)",
          color: "#ffffff",
          border: "none",
          borderRadius: 10,
          padding: "10px 12px",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.6 : 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        <i className="fa-solid fa-paper-plane" />
        Send
      </button>
    </div>
  );
}