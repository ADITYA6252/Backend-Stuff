import React, { useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import Editor from "react-simple-code-editor";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";

const CodeEditor = Editor.default || Editor;

const App = () => {
  const [code, setcode] = useState(`function name(params) {
  return 1+1;
}`);

  const [review, setreview] = useState(``);

  async function reviewCode() {
    const response = await axios.post("http://localhost:3000/ai/get-review", {
      code,
    });

    setreview(response.data);
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <CodeEditor
              value={code}
              onValueChange={(code) => setcode(code)}
              highlight={(code) =>
                Prism.highlight(code, Prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 16,
                color: "#f8f8f2",
                backgroundColor: "rgb(26,25,25)",
                outline: "none",
              }}
            />
          </div>

          <div onClick={reviewCode} className="review">
            Review
          </div>
        </div>
        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </main>
    </>
  );
};

export default App;
