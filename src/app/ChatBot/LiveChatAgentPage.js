// LiveChatAgentPage.jsx
"use client";

import React from "react";

// Agent messages will now be on the right
function AgentMessage({ text }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
      <div style={{ background: "#dbeafe", border: "1px solid #bfdbfe", padding: "8px 12px", borderRadius: 12, color: "#0f172a", maxWidth: "80%" }}>
        {text}
      </div>
    </div>
  );
}
// Customer messages will now be on the left
function CustomerMessage({ text, onPushToInfo }) {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <div style={{ display: "flex", marginBottom: 10, gap: 8, alignItems: "flex-start" }}>
      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#1d4ed8", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flex: "0 0 auto" }}>
        C
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}> {/* Wrapper for message and button */}
        <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", padding: "8px 12px", borderRadius: 12, color: "#0f172a", maxWidth: "100%", whiteSpace: "pre-wrap", position: "relative" }}>
          {text}
        </div>
        {onPushToInfo && (
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#64748b", padding: "0 5px" }}
            >
              &#8942; {/* Unicode for three vertical dots */}
            </button>
            {showMenu && (
              <div style={{
                position: "absolute",
                top: "100%",
                right: 0,
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                zIndex: 10,
                minWidth: 120,
              }}>
                <button
                  onClick={() => { onPushToInfo(text); setShowMenu(false); }}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 14,
                    color: "#0f172a",
                    "&:hover": { background: "#f1f5f9" }
                  }}
                >
                  Push to Info
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function LiveChatAgentPage() {
  // State to hold all chat sessions: { customerName: { messages: [], unreadCount: 0, details: { name: '', email: '', phone: '' } } }
  const [chatSessions, setChatSessions] = React.useState({});
  const [activeCustomer, setActiveCustomer] = React.useState(null); // The customer whose chat is currently open
  const [inputValue, setInputValue] = React.useState("");
  const [mounted, setMounted] = React.useState(false); // New state for client-side mounting

  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    setMounted(true); // Set mounted to true once component is client-side mounted
  }, []);

  // Function to load all chat sessions from localStorage
  const loadChatSessions = React.useCallback(() => {
    if (!mounted) return; // Only access localStorage if mounted
    const storedSessions = JSON.parse(localStorage.getItem('liveChatSessions') || '{}');
    setChatSessions(prevSessions => {
      const newSessions = { ...prevSessions };
      for (const customerName in storedSessions) {
        newSessions[customerName] = {
          messages: storedSessions[customerName].messages,
          unreadCount: prevSessions[customerName]?.unreadCount || 0,
          details: prevSessions[customerName]?.details || { name: customerName, email: '', phone: '' } // Initialize details
        };
      }
      return newSessions;
    });
  }, [mounted]);

  // Effect to load sessions on mount and listen for storage changes
  React.useEffect(() => {
    if (!mounted) return; // Only add event listener if mounted

    loadChatSessions(); // Initial load

    const handleStorageChange = (event) => {
      if (event.key === 'liveChatSessions') {
        const newStoredSessions = JSON.parse(event.newValue || '{}');
        setChatSessions(prevSessions => {
          const updatedSessions = { ...prevSessions };
          for (const customerName in newStoredSessions) {
            const newMessages = newStoredSessions[customerName].messages;
            const currentMessages = prevSessions[customerName]?.messages || [];

            // Calculate new unread count
            let newUnreadCount = prevSessions[customerName]?.unreadCount || 0;
            // Count only new messages from the user that are not already in the current session
            const newCustomerMessages = newMessages.filter(m => m.from === 'user');
            const currentCustomerMessages = currentMessages.filter(m => m.from === 'user');

            if (newCustomerMessages.length > currentCustomerMessages.length) {
              // Find messages that are in newCustomerMessages but not in currentCustomerMessages
              const trulyNewMessages = newCustomerMessages.filter(
                (newMessage) => !currentCustomerMessages.some(
                  (currentMessage) => currentMessage.text === newMessage.text && currentMessage.from === newMessage.from
                )
              );
              newUnreadCount += trulyNewMessages.length;
            }


            updatedSessions[customerName] = {
              messages: newMessages,
              unreadCount: customerName === activeCustomer ? 0 : newUnreadCount, // Reset unread if active
              details: prevSessions[customerName]?.details || { name: customerName, email: '', phone: '' } // Preserve or initialize details
            };
          }
          // Remove sessions that no longer exist in localStorage
          for (const customerName in updatedSessions) {
            if (!newStoredSessions[customerName]) {
              delete updatedSessions[customerName];
            }
          }
          return updatedSessions;
        });
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [loadChatSessions, activeCustomer, mounted]); // Added mounted to dependencies

  // Scroll to bottom when active chat messages change
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeCustomer, chatSessions[activeCustomer]?.messages]);

  // Function to send a message from the agent to the active customer
  function sendAgentMessage(messageText, type = 'text', details = null) {
    const v = messageText.trim();
    if (!v || !activeCustomer || !mounted) return; // Only send if mounted

    setChatSessions(prevSessions => {
      const updatedSessions = { ...prevSessions };
      const currentMessages = updatedSessions[activeCustomer]?.messages || [];
      const newMessages = [...currentMessages, { from: 'agent', text: v, type, details }];
      updatedSessions[activeCustomer] = { ...updatedSessions[activeCustomer], messages: newMessages };

      // Update localStorage
      localStorage.setItem('liveChatSessions', JSON.stringify(
        Object.fromEntries(
          Object.entries(updatedSessions).map(([name, session]) => [name, { messages: session.messages }])
        )
      ));
      return updatedSessions;
    });
    setInputValue("");
  }

  // Function to set the active customer and mark messages as read
  function selectCustomerChat(customerName) {
    setActiveCustomer(customerName);
    setChatSessions(prevSessions => ({
      ...prevSessions,
      [customerName]: { ...prevSessions[customerName], unreadCount: 0 } // Reset unread count
    }));
  }

  // Function to update customer details from a message
  function pushToInfo(messageText) {
    if (!mounted) return; // Only access localStorage if mounted
    setChatSessions(prevSessions => {
      if (!activeCustomer) return prevSessions;
      const updatedSessions = { ...prevSessions };
      const currentDetails = updatedSessions[activeCustomer]?.details || { name: activeCustomer, email: '', phone: '' };

      // Simple regex to extract email or phone. Can be made more robust.
      const emailMatch = messageText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
      const phoneMatch = messageText.match(/(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/);

      if (emailMatch && !currentDetails.email) {
        currentDetails.email = emailMatch[0];
      }
      if (phoneMatch && !currentDetails.phone) {
        currentDetails.phone = phoneMatch[0];
      }

      updatedSessions[activeCustomer] = { ...updatedSessions[activeCustomer], details: currentDetails };
      return updatedSessions;
    });
  }

  // Function to send collected details to the customer for confirmation
  function sendDetailsToCustomer() {
    if (!activeCustomer || !mounted) return; // Only send if mounted

    const details = chatSessions[activeCustomer]?.details;
    if (!details || (!details.name && !details.email && !details.phone)) {
      alert("No details to send to customer.");
      return;
    }

    // Send a structured message with type 'details_request' and the details payload
    sendAgentMessage("Please confirm your details:", 'details_request', details);
  }

  // Function to request a specific field from the customer
  function requestFieldFromCustomer(field) {
    if (!activeCustomer || !mounted) return; // Only send if mounted
    sendAgentMessage(`Please send your ${field.charAt(0).toUpperCase() + field.slice(1)}.`);
  }


  const activeChatMessages = chatSessions[activeCustomer]?.messages || [];
  const activeCustomerDetails = chatSessions[activeCustomer]?.details || { name: '', email: '', phone: '' };

  // If not mounted, render nothing to prevent hydration errors
  if (!mounted) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        height: "90vh", // Take up most of the viewport height
        width: "95vw", // Take up most of the viewport width
        margin: "2.5vh auto", // Center it
        background: "#ffffff",
        borderRadius: "14px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.20), 0 6px 10px rgba(0,0,0,0.10)",
        overflow: "hidden",
        fontFamily: "sans-serif",
      }}
    >
      {/* Sidebar for Customer List */}
      <div
        style={{
          width: "280px",
          borderRight: "1px solid #e5e7eb",
          background: "#f8fafc",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #0ea5e9 100%)",
            color: "#fff",
            padding: "12px 14px",
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          Active Chats
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "10px 0" }}>
          {Object.keys(chatSessions).length === 0 ? (
            <div style={{ padding: "10px 14px", color: "#64748b", fontSize: 14 }}>
              No active customer chats.
            </div>
          ) : (
            Object.keys(chatSessions).map((customerName) => (
              <button
                key={customerName}
                onClick={() => selectCustomerChat(customerName)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "12px 14px",
                  background: activeCustomer === customerName ? "#e0f2fe" : "transparent",
                  border: "none",
                  borderBottom: "1px solid #f1f5f9",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                  position: "relative",
                }}
              >
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#93c5fd", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600 }}>
                  {customerName.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1, fontWeight: chatSessions[customerName]?.unreadCount > 0 ? 700 : 500, color: "#0f172a" }}>
                  {customerName}
                </div>
                {chatSessions[customerName]?.unreadCount > 0 && (
                  <span style={{
                    background: "#ef4444",
                    color: "#fff",
                    fontSize: 10,
                    fontWeight: 700,
                    borderRadius: 999,
                    padding: "2px 6px",
                    minWidth: 18,
                    textAlign: "center",
                    position: "absolute",
                    right: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}>
                    {chatSessions[customerName].unreadCount}
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
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
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontWeight: 700 }}>
              {activeCustomer ? `Chat with ${activeCustomer}` : "Select a Customer"}
            </div>
            <div style={{ fontSize: 12, opacity: 0.9 }}>
              {activeCustomer ? "Connected" : "No customer selected"}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} style={{ flex: 1, padding: "12px", overflowY: "auto", background: "#f7fafc" }}>
          {/* Removed column-reverse and reverse() to show most recent at the bottom, which is standard chat behavior */}
          {!activeCustomer ? (
            <div style={{ textAlign: "center", color: "#64748b", marginTop: 50 }}>
              Please select a customer from the left sidebar to view their chat.
            </div>
          ) : (
            activeChatMessages.map((m, idx) => // Display messages in chronological order
              m.from === "user" ? <CustomerMessage key={idx} text={m.text} onPushToInfo={pushToInfo} /> :
              <AgentMessage key={idx} text={m.text} />
            )
          )}
        </div>

        {/* Agent Input */}
        <div style={{ borderTop: "1px solid #e5e7eb", padding: "10px", background: "#ffffff", display: "flex", gap: 8, alignItems: "center" }}>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendAgentMessage(inputValue); } }}
            placeholder={activeCustomer ? `Type your message to ${activeCustomer}...` : "Select a customer to chat..."}
            disabled={!activeCustomer}
            style={{ flex: 1, padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", outline: "none", fontSize: 14, background: !activeCustomer ? "#f1f5f9" : "#fff" }}
          />
          <button
            onClick={() => sendAgentMessage(inputValue)}
            aria-label="Send message to user"
            disabled={!activeCustomer || !inputValue.trim()}
            style={{
              background: "linear-gradient(135deg, #0ea5e9 0%, #1d4ed8 100%)",
              color: "#ffffff",
              border: "none",
              borderRadius: 10,
              padding: "10px 12px",
              cursor: (!activeCustomer || !inputValue.trim()) ? "not-allowed" : "pointer",
              opacity: (!activeCustomer || !inputValue.trim()) ? 0.6 : 1,
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
      </div>

      {/* Customer Details Container */}
      <div
        style={{
          width: "300px",
          borderLeft: "1px solid #e5e7eb",
          background: "#f8fafc",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #0ea5e9 100%)",
            color: "#fff",
            padding: "12px 14px",
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          Customer Details
        </div>
        <div style={{ flex: 1, padding: "15px" }}>
          {!activeCustomer ? (
            <div style={{ color: "#64748b", fontSize: 14 }}>
              Select a customer to view details.
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ fontSize: 12, color: "#475569", marginBottom: 4, flex: 1 }}>Name:</div>
                <input
                  type="text"
                  value={activeCustomerDetails.name}
                  onChange={(e) => setChatSessions(prev => ({
                    ...prev,
                    [activeCustomer]: { ...prev[activeCustomer], details: { ...prev[activeCustomer].details, name: e.target.value } }
                  }))}
                  style={{ width: "100%", padding: "8px", borderRadius: 6, border: "1px solid #e5e7eb", fontSize: 14, flex: 3 }}
                  placeholder="Customer Name"
                />
                {!activeCustomerDetails.name && (
                  <button
                    onClick={() => requestFieldFromCustomer('name')}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#2563eb", fontSize: 16, padding: "0 5px" }}
                    title="Request Name"
                  >
                    <i className="fa-solid fa-paper-plane" />
                  </button>
                )}
              </div>
              <div style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ fontSize: 12, color: "#475569", marginBottom: 4, flex: 1 }}>Email:</div>
                <input
                  type="email"
                  value={activeCustomerDetails.email}
                  onChange={(e) => setChatSessions(prev => ({
                    ...prev,
                    [activeCustomer]: { ...prev[activeCustomer], details: { ...prev[activeCustomer].details, email: e.target.value } }
                  }))}
                  style={{ width: "100%", padding: "8px", borderRadius: 6, border: "1px solid #e5e7eb", fontSize: 14, flex: 3 }}
                  placeholder="Customer Email"
                />
                {!activeCustomerDetails.email && (
                  <button
                    onClick={() => requestFieldFromCustomer('email')}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#2563eb", fontSize: 16, padding: "0 5px" }}
                    title="Request Email"
                  >
                    <i className="fa-solid fa-paper-plane" />
                  </button>
                )}
              </div>
              <div style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ fontSize: 12, color: "#475569", marginBottom: 4, flex: 1 }}>Phone:</div>
                <input
                  type="tel"
                  value={activeCustomerDetails.phone}
                  onChange={(e) => setChatSessions(prev => ({
                    ...prev,
                    [activeCustomer]: { ...prev[activeCustomer], details: { ...prev[activeCustomer].details, phone: e.target.value } }
                  }))}
                  style={{ width: "100%", padding: "8px", borderRadius: 6, border: "1px solid #e5e7eb", fontSize: 14, flex: 3 }}
                  placeholder="Customer Phone"
                />
                {!activeCustomerDetails.phone && (
                  <button
                    onClick={() => requestFieldFromCustomer('phone')}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#2563eb", fontSize: 16, padding: "0 5px" }}
                    title="Request Phone"
                  >
                    <i className="fa-solid fa-paper-plane" />
                  </button>
                )}
              </div>
              {/* Add other details here as needed */}
            </div>
          )}
        </div>
        <div style={{ borderTop: "1px solid #e5e7eb", padding: "10px", background: "#ffffff" }}>
          <button
            onClick={sendDetailsToCustomer}
            disabled={!activeCustomer}
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "10px 12px",
              cursor: !activeCustomer ? "not-allowed" : "pointer",
              opacity: !activeCustomer ? 0.7 : 1,
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            Send Details to Customer
          </button>
        </div>
      </div>
    </div>
  );
}