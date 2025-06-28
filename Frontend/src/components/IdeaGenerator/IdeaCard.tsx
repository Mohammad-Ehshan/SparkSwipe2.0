import ReactMarkdown from 'react-markdown';

export default function IdeaCard({ content }: { content: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
      <div className="prose prose-blue max-w-none">
        <ReactMarkdown>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}