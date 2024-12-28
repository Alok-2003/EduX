import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Read: React.FC = () => {
  const [readmeContent, setReadmeContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Adjust the path to where your README file is stored
    fetch('./src/assets/Reentrancy.md') // Path to the README file in the public folder
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch README file');
        }
        return response.text();
      })
      .then((data) => {
        setReadmeContent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>README Content</h1>
      {/* Render the markdown content */}
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {readmeContent}
      </ReactMarkdown>
    </div>
  );
};

export default Read;
