import "./App.css";
import { Editor } from "@monaco-editor/react";
import { MonacoBinding } from "y-monaco";
import { useRef, useMemo, useState, useEffect } from "react";
import * as Y from "yjs";
import { SocketIOProvider } from "y-socket.io";

function App() {
  const editorRef = useRef(null);

  const [username, setUsername] = useState(() => {
    return new URLSearchParams(window.location.search).get("username") || "";
  });

  const [user, setuser] = useState([]);
  const ydoc = useMemo(() => new Y.Doc(), []);
  const yText = useMemo(() => ydoc.getText("monaco"), [ydoc]);

  const handleMount = (editor) => {
    editorRef.current = editor;
  };

  const handleJoin = (e) => {
    e.preventDefault();
    setUsername(e.target.username.value);
    window.history.pushState({}, "", `?username=${e.target.username.value}`);
  };

  useEffect(() => {
    if (!editorRef.current || !username) return;

    const provider = new SocketIOProvider(
      "http://localhost:3000",
      "monaco-room",
      ydoc,
      {
        autoConnect: true,
      },
    );

    // ✅ set username
    provider.awareness.setLocalStateField("user", {
      username,
    });

    // ✅ FIX: delay for self user
    setTimeout(() => {
      const states = Array.from(provider.awareness.getStates().values());

      setuser(
        states
          .filter((state) => state.user && state.user.username)
          .map((state) => state.user),
      );
    }, 100);

    // ✅ real-time updates
    provider.awareness.on("change", () => {
      const states = Array.from(provider.awareness.getStates().values());

      setuser(
        states
          .filter((state) => state.user && state.user.username)
          .map((state) => state.user),
      );
    });

    function handleBeforeUnload() {
      provider.awareness.setLocalStateField("user", null);
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    const model = editorRef.current.getModel();
    if (!model) return;

    const monacoBinding = new MonacoBinding(
      yText,
      model,
      new Set([editorRef.current]),
      provider.awareness,
    );

    return () => {
      monacoBinding.destroy();
      provider.disconnect();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [username]);

  if (!username) {
    return (
      <main className="h-screen w-full bg-gray-950 flex gap-4 p-3 items-center justify-center">
        <form onSubmit={handleJoin} className="flex flex-col gap-4">
          <input
            className="p-2 rounded-lg bg-gray-800 text-white"
            type="text"
            placeholder="Enter your username"
            name="username"
          />
          <button className="p-2 rounded-lg bg-amber-50 text-gray-950 font-bold">
            Join Room
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="h-screen w-full bg-gray-950 flex gap-4 p-3">
      <aside className="h-full w-1/4 bg-amber-50 rounded-lg">
        <h2 className="text-2xl font-bold p-4 border-b border-gray-300">
          Users
        </h2>
        <ul className="p-4">
          {user.map((user, index) => (
            <li key={index} className="p-2 bg-gray-200 rounded mb-2">
              {user.username}
            </li>
          ))}
        </ul>
      </aside>

      <section className="w-3/4 bg-neutral-800 rounded-lg overflow-hidden">
        <Editor
          height="100%"
          language="javascript"
          theme="vs-dark"
          defaultValue="// Write your code here"
          onMount={handleMount}
        />
      </section>
    </main>
  );
}

export default App;
