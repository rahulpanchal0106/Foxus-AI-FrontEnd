import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

const CodeBlock = ({ code }) => {
  const codeRef = useRef();
  useEffect(() => {
    if (codeRef && codeRef.current) {
      hljs.highlightBlock(codeRef.current);
    }
  }, [code]);

  return (
    <pre>
      <code ref={codeRef}>
        {code}
      </code>
    </pre>
  );
};

export default CodeBlock