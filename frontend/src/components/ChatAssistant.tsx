import { FormEvent, useMemo, useState } from 'react';
import './chat-assistant.css';

type Message = {
  id: string;
  role: 'visitor' | 'guide';
  content: string;
};

const knowledgeBase: { keywords: string[]; response: string }[] = [
  {
    keywords: ['event', 'events', 'calendar'],
    response: 'You can explore upcoming gatherings on the Events page. Tap “Create event” (coming soon) if you want to collaborate with us.'
  },
  {
    keywords: ['vault', 'history', 'archive'],
    response: 'The Vault holds digitized newsletters, oral histories, and memorabilia. Start with the featured collections to dive in.'
  },
  {
    keywords: ['services', 'support', 'help'],
    response: 'We offer advocacy, community resources, and mentorship opportunities. Reach out to the Guild Services desk for tailored guidance.'
  }
];

const defaultReply =
  'I’m here to help! Ask me about guild services, upcoming events, or how to explore our Vault.';

const id = () => (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2));

const ChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'intro',
      role: 'guide',
      content: 'Hi there! I’m the Guild Guide. How can I support your visit today?'
    }
  ]);
  const [draft, setDraft] = useState('');

  const responseForDraft = useMemo(() => {
    const lowerDraft = draft.toLowerCase();
    const match = knowledgeBase.find(({ keywords }) => keywords.some((keyword) => lowerDraft.includes(keyword)));
    return match ? match.response : defaultReply;
  }, [draft]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft.trim()) return;

    const visitorMessage: Message = {
      id: id(),
      role: 'visitor',
      content: draft.trim()
    };

    setMessages((prev) => [...prev, visitorMessage, { id: id(), role: 'guide', content: responseForDraft }]);
    setDraft('');
  };

  return (
    <section className="chat-assistant">
      <header>
        <p className="section-eyebrow">Guild Guide</p>
        <h2>Chat with our digital concierge</h2>
      </header>
      <div className="chat-window" aria-live="polite">
        {messages.map((message) => (
          <div key={message.id} className={`chat-message chat-message--${message.role}`}>
            <span className="chat-message__label">{message.role === 'guide' ? 'Guide' : 'You'}</span>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      <form className="chat-form" onSubmit={handleSubmit}>
        <label htmlFor="chat-input" className="sr-only">
          Ask the Guild Guide
        </label>
        <input
          id="chat-input"
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ask about services, events, or history"
        />
        <button type="submit">Send</button>
      </form>
    </section>
  );
};

export default ChatAssistant;
