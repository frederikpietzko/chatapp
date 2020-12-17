import React from 'react';
import { AllChat } from './components/AllChat';
import { Chatrooms } from './components/Chatrooms';
import { CreateChatroom } from './components/CreateChatroom';

const App: React.FC = () => {
  return (
    <div>
      <AllChat />
      <Chatrooms />
      <CreateChatroom />
    </div>
  );
};

export default App;
