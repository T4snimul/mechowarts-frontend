import { useState } from "react";
import { Search, ChevronLeft, Send } from "lucide-react";
import type { PersonProfile, ChatMessage } from "../../types";
import { chatConversations } from "../../data/chat";
import { peopleData } from "../../data/people";

export default function ChatPage({
  onOpenProfile,
}: {
  onOpenProfile: (p: PersonProfile) => void;
}) {
  const [activeConvId, setActiveConvId] = useState(chatConversations[0].id);
  const [messageInput, setMessageInput] = useState("");
  const [mobileShowConv, setMobileShowConv] = useState(false);
  const [localMessages, setLocalMessages] = useState<
    Record<string, ChatMessage[]>
  >(() => {
    const init: Record<string, ChatMessage[]> = {};
    chatConversations.forEach((c) => {
      init[c.id] = c.messages;
    });
    return init;
  });

  const activeConv = chatConversations.find((c) => c.id === activeConvId)!;
  const participant = peopleData.find((p) => p.id === activeConv.participantId);
  const messages = localMessages[activeConvId] || [];

  function sendMessage() {
    if (!messageInput.trim()) return;
    const msg: ChatMessage = {
      id: `m${Date.now()}`,
      senderId: "s2408-01",
      text: messageInput.trim(),
      time: "Just now",
    };
    setLocalMessages((prev) => ({
      ...prev,
      [activeConvId]: [...(prev[activeConvId] || []), msg],
    }));
    setMessageInput("");
  }

  return (
    <div className="flex h-full">
      {/* Conversation list */}
      <div
        className={`${mobileShowConv ? "hidden" : "flex"} border-border w-full shrink-0 flex-col border-r md:flex md:w-[280px]`}
      >
        <div className="border-border border-b p-3">
          <div className="relative">
            <Search
              size={13}
              className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
            />
            <input
              placeholder="Search messages…"
              className="bg-muted/50 border-border focus:ring-primary/30 w-full rounded-lg border py-1.5 pr-3 pl-8 text-xs focus:ring-1 focus:outline-none"
            />
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          {chatConversations.map((conv) => {
            const person = peopleData.find((p) => p.id === conv.participantId);
            if (!person) return null;
            const isActive = conv.id === activeConvId;
            return (
              <button
                key={conv.id}
                onClick={() => {
                  setActiveConvId(conv.id);
                  setMobileShowConv(true);
                }}
                className={`border-border flex w-full items-center gap-3 border-b px-4 py-3 text-left transition-colors ${isActive ? "bg-primary/5" : "hover:bg-muted/40"}`}
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
                  style={{ backgroundColor: person.avatarColor }}
                >
                  {person.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <p
                      className={`truncate text-sm font-semibold ${isActive ? "text-primary" : "text-foreground"}`}
                    >
                      {person.name}
                    </p>
                    <span className="text-muted-foreground shrink-0 text-[10px]">
                      {conv.lastTime}
                    </span>
                  </div>
                  <p className="text-muted-foreground truncate text-[11px]">
                    {conv.lastMessage}
                  </p>
                </div>
                {conv.unread > 0 && (
                  <span className="bg-primary text-primary-foreground flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold">
                    {conv.unread}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Conversation */}
      <div
        className={`${mobileShowConv ? "flex" : "hidden"} min-w-0 flex-1 flex-col md:flex`}
      >
        {participant ? (
          <>
            <div className="border-border bg-card flex h-14 shrink-0 items-center gap-3 border-b px-4">
              <button
                onClick={() => setMobileShowConv(false)}
                className="hover:bg-accent text-muted-foreground flex h-7 w-7 items-center justify-center rounded-lg transition-colors md:hidden"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={() => onOpenProfile(participant)}
                className="flex items-center gap-3 transition-opacity hover:opacity-80"
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white"
                  style={{ backgroundColor: participant.avatarColor }}
                >
                  {participant.avatar}
                </div>
                <div className="text-left">
                  <p className="text-foreground text-sm leading-tight font-semibold">
                    {participant.name}
                  </p>
                  <p className="text-muted-foreground text-[10px]">
                    {participant.role === "teacher"
                      ? participant.designation
                      : participant.role === "student"
                        ? `${participant.series} Series`
                        : participant.companyRole}
                  </p>
                </div>
              </button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
              {messages.map((msg) => {
                const isMine = msg.senderId === "s2408-01";
                const sender = peopleData.find((p) => p.id === msg.senderId);
                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 ${isMine ? "flex-row-reverse" : ""}`}
                  >
                    {!isMine && (
                      <div
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold text-white"
                        style={{
                          backgroundColor: sender?.avatarColor || "#64748b",
                        }}
                      >
                        {sender?.avatar}
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] ${isMine ? "items-end" : "items-start"} flex flex-col gap-0.5`}
                    >
                      <div
                        className={`rounded-2xl px-3.5 py-2.5 text-sm leading-snug ${isMine ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted text-foreground rounded-bl-sm"}`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-muted-foreground px-1 text-[10px]">
                        {msg.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-border bg-card border-t px-4 py-3">
              <div className="flex items-center gap-2.5">
                <input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder={`Message ${participant.name}…`}
                  className="bg-muted/50 border-border focus:ring-primary/30 focus:border-primary/50 flex-1 rounded-full border px-4 py-2 text-sm focus:ring-2 focus:outline-none"
                />
                <button
                  onClick={sendMessage}
                  disabled={!messageInput.trim()}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors disabled:opacity-40"
                >
                  <Send size={15} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-muted-foreground flex flex-1 items-center justify-center text-sm">
            Select a conversation
          </div>
        )}
      </div>
    </div>
  );
}
