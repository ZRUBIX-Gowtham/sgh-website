// LiveChatAgentPage.jsx
"use client";

import React from "react";

// // Agent messages will now be on the right
// function AgentMessage({ text }) {
//   return (
//     <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
//       <div style={{ background: "#dbeafe", border: "1px solid #bfdbfe", padding: "8px 12px", borderRadius: 12, color: "#0f172a", maxWidth: "80%" }}>
//         {text}
//       </div>
//     </div>
//   );
// }
// // Customer messages will now be on the left
// function CustomerMessage({ text }) {
//   return (
//     <div style={{ display: "flex", marginBottom: 10, gap: 8, alignItems: "flex-start" }}>
//       <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#1d4ed8", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flex: "0 0 auto" }}>
//         C
//       </div>
//       <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", padding: "8px 12px", borderRadius: 12, color: "#0f172a", maxWidth: "100%", whiteSpace: "pre-wrap" }}>
//         {text}
//       </div>
//     </div>
//   );
// }

export default function LiveChatAgentPage() {
  // State to hold all chat sessions: { customerName: { messages: [], unreadCount: 0 } }
  // const [chatSessions, setChatSessions] = React.useState({});
  // const [activeCustomer, setActiveCustomer] = React.useState(null); // The customer whose chat is currently open
  // const [inputValue, setInputValue] = React.useState("");

  // const scrollRef = React.useRef(null);

  // // Function to load all chat sessions from localStorage
  // const loadChatSessions = React.useCallback(() => {
  //   const storedSessions = JSON.parse(localStorage.getItem('liveChatSessions') || '{}');
  //   setChatSessions(prevSessions => {
  //     const newSessions = { ...prevSessions };
  //     for (const customerName in storedSessions) {
  //       newSessions[customerName] = {
  //         messages: storedSessions[customerName].messages,
  //         unreadCount: prevSessions[customerName]?.unreadCount || 0,
  //       };
  //     }
  //     return newSessions;
  //   });
  // }, []);

  // // Effect to load sessions on mount and listen for storage changes
  // React.useEffect(() => {
  //   loadChatSessions(); // Initial load

  //   const handleStorageChange = (event) => {
  //     if (event.key === 'liveChatSessions') {
  //       const newStoredSessions = JSON.parse(event.newValue || '{}');
  //       setChatSessions(prevSessions => {
  //         const updatedSessions = { ...prevSessions };
  //         for (const customerName in newStoredSessions) {
  //           const newMessages = newStoredSessions[customerName].messages;
  //           const currentMessages = prevSessions[customerName]?.messages || [];

  //           // Calculate new unread count
  //           let newUnreadCount = prevSessions[customerName]?.unreadCount || 0;
  //           if (newMessages.length > currentMessages.length && customerName !== activeCustomer) {
  //             // Count only new messages from the user
  //             const newCustomerMessages = newMessages.filter(m => m.from === 'user').length;
  //             const currentCustomerMessages = currentMessages.filter(m => m.from === 'user').length;
  //             newUnreadCount += (newCustomerMessages - currentCustomerMessages);
  //           }

  //           updatedSessions[customerName] = {
  //             messages: newMessages,
  //             unreadCount: newUnreadCount,
  //           };
  //         }
  //         // Remove sessions that no longer exist in localStorage
  //         for (const customerName in updatedSessions) {
  //           if (!newStoredSessions[customerName]) {
  //             delete updatedSessions[customerName];
  //           }
  //         }
  //         return updatedSessions;
  //       });
  //     }
  //   };

  //   // window.addEventListener('storage', handleStorageChange);
  //   // return () => window.removeEventListener('storage', handleStorageChange);
  // }, [loadChatSessions, activeCustomer]);

  // // Scroll to bottom when active chat messages change
  // React.useEffect(() => {
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  //   }
  // }, [activeCustomer, chatSessions[activeCustomer]?.messages]);

  // // Function to send a message from the agent to the active customer
  // function sendAgentMessage(messageText) {
  //   const v = messageText.trim();
  //   if (!v || !activeCustomer) return;

  //   setChatSessions(prevSessions => {
  //     const updatedSessions = { ...prevSessions };
  //     const currentMessages = updatedSessions[activeCustomer]?.messages || [];
  //     const newMessages = [...currentMessages, { from: 'agent', text: v }];
  //     updatedSessions[activeCustomer] = { ...updatedSessions[activeCustomer], messages: newMessages };

  //     // Update localStorage
  //     localStorage.setItem('liveChatSessions', JSON.stringify(
  //       Object.fromEntries(
  //         Object.entries(updatedSessions).map(([name, session]) => [name, { messages: session.messages }])
  //       )
  //     ));
  //     return updatedSessions;
  //   });
  //   setInputValue("");
  // }

  // // Function to set the active customer and mark messages as read
  // function selectCustomerChat(customerName) {
  //   setActiveCustomer(customerName);
  //   setChatSessions(prevSessions => ({
  //     ...prevSessions,
  //     [customerName]: { ...prevSessions[customerName], unreadCount: 0 } // Reset unread count
  //   }));
  // }

  // const activeChatMessages = chatSessions[activeCustomer]?.messages || [];

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
      Sidebar for Customer List
    
    </div>
  );
}