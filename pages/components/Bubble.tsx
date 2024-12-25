// In your Bubble component file
const Bubble = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-3/4 p-3 rounded-lg ${isUser ? 'bg-blue-600' : 'bg-gray-700'}`}>
        <p className="text-white">{message.content}</p>
      </div>
    </div>
  );
};

export default Bubble;
