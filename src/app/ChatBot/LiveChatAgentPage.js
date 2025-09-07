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
function CustomerMessage({ text }) {
  return (
    <div style={{ display: "flex", marginBottom: 10, gap: 8, alignItems: "flex-start" }}>
      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#1d4ed8", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flex: "0 0 auto" }}>
        C
      </div>
      <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", padding: "8px 12px", borderRadius: 12, color: "#0f172a", maxWidth: "100%", whiteSpace: "pre-wrap" }}>
        {text}
      </div>
    </div>
  );
}

export default function LiveChatAgentPage() {
  // State to hold all chat sessions: { customerName: { messages: [], unreadCount: 0 } }
  const [chatSessions, setChatSessions] = React.useState({});
  const [activeCustomer, setActiveCustomer] = React.useState(null); // The customer whose chat is currently open
  const [inputValue, setInputValue] = React.useState("");

  const scrollRef = React.useRef(null);

  // Function to load all chat sessions from localStorage
  const loadChatSessions = React.useCallback(() => {
    const storedSessions = JSON.parse(localStorage.getItem('liveChatSessions') || '{}');
    setChatSessions(prevSessions => {
      const newSessions = { ...prevSessions };
      for (const customerName in storedSessions) {
        newSessions[customerName] = {
          messages: storedSessions[customerName].messages,
          unreadCount: prevSessions[customerName]?.unreadCount || 0,
        };
      }
      return newSessions;
    });
  }, []);

  // Effect to load sessions on mount and listen for storage changes
  React.useEffect(() => {
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
            if (newMessages.length > currentMessages.length && customerName !== activeCustomer) {
              // Count only new messages from the user
              const newCustomerMessages = newMessages.filter(m => m.from === 'user').length;
              const currentCustomerMessages = currentMessages.filter(m => m.from === 'user').length;
              newUnreadCount += (newCustomerMessages - currentCustomerMessages);
            }

            updatedSessions[customerName] = {
              messages: newMessages,
              unreadCount: newUnreadCount,
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
  }, [loadChatSessions, activeCustomer]);

  // Scroll to bottom when active chat messages change
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeCustomer, chatSessions[activeCustomer]?.messages]);

  // Function to send a message from the agent to the active customer
  function sendAgentMessage(messageText) {
    const v = messageText.trim();
    if (!v || !activeCustomer) return;

    setChatSessions(prevSessions => {
      const updatedSessions = { ...prevSessions };
      const currentMessages = updatedSessions[activeCustomer]?.messages || [];
      const newMessages = [...currentMessages, { from: 'agent', text: v }];
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

  const activeChatMessages = chatSessions[activeCustomer]?.messages || [];

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
        <div ref={scrollRef} style={{ flex: 1, padding: "12px", overflowY: "auto", background: "#f7fafc", display: "flex", flexDirection: "column-reverse" }}>
          {/* Using column-reverse to show recent messages at the bottom */}
          {!activeCustomer ? (
            <div style={{ textAlign: "center", color: "#64748b", marginTop: 50 }}>
              Please select a customer from the left sidebar to view their chat.
            </div>
          ) : (
            [...activeChatMessages].reverse().map((m, idx) => // Reverse here for display
              m.from === "user" ? <CustomerMessage key={idx} text={m.text} /> :
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
    </div>
  );
}