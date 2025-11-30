import { useEffect, useState } from "react";

/**
 * Simple admin editor for questions.
 * - Select a test type
 * - Add question + options (each option has text and a simple score mapping key:value, e.g. "tech:2")
 * - Persist to localStorage
 */

const STORAGE_KEYS = {
  career: "careerQuestions",
  personality: "personalityQuestions",
  skill: "skillQuestions",
};

// Helpers to parse option score string "tech:2,creative:1" -> {tech:2, creative:1}
function parseScoreString(str) {
  const obj = {};
  (str || "").split(",").forEach((part) => {
    const p = part.split(":").map(s => s && s.trim());
    if (p[0]) obj[p[0]] = Number(p[1] || 1);
  });
  return obj;
}

function ManageTests() {
  const [type, setType] = useState("career");
  const [items, setItems] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [newOptions, setNewOptions] = useState([
    { text: "", score: "" },
    { text: "", score: "" },
  ]);
  const [editingIndex, setEditingIndex] = useState(-1);

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line
  }, [type]);

  function loadItems() {
    const raw = localStorage.getItem(STORAGE_KEYS[type]);
    if (raw) setItems(JSON.parse(raw));
    else setItems([]);
  }

  function saveItems(next) {
    localStorage.setItem(STORAGE_KEYS[type], JSON.stringify(next));
    setItems(next);
  }

  function handleAddOrUpdate() {
    if (!questionText.trim()) {
      alert("Please enter a question");
      return;
    }
    const opts = newOptions
      .filter(o => o.text.trim())
      .map(o => ({ text: o.text.trim(), score: parseScoreString(o.score) }));

    if (opts.length === 0) {
      alert("Add at least one option");
      return;
    }

    const q = { question: questionText.trim(), options: opts };

    let next = [...items];
    if (editingIndex >= 0) {
      next[editingIndex] = q;
      setEditingIndex(-1);
    } else {
      next.push(q);
    }
    saveItems(next);
    clearForm();
  }

  function clearForm() {
    setQuestionText("");
    setNewOptions([{ text: "", score: "" }, { text: "", score: "" }]);
  }

  function handleDelete(i) {
    if (!confirm("Delete this question?")) return;
    const next = items.filter((_, idx) => idx !== i);
    saveItems(next);
  }

  function handleEdit(i) {
    const q = items[i];
    setEditingIndex(i);
    setQuestionText(q.question);
    setNewOptions(q.options.map(o => ({ text: o.text, score: Object.entries(o.score).map(([k,v]) => `${k}:${v}`).join(",") })));
  }

  return (
    <div>
      <h2 className="form-title">Manage Tests (Admin)</h2>

      <div className="form-row">
        <label>Choose test: </label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="career">Career Assessment</option>
          <option value="personality">Personality Test</option>
          <option value="skill">Skills Evaluation</option>
        </select>
      </div>

      <hr />

      <div>
        <h3>{editingIndex >= 0 ? "Edit Question" : "Add Question"}</h3>

        <div className="form-row">
          <input
            placeholder="Question text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </div>

        <div>
          <p style={{ margin: "6px 0" }}>Options (option text + score mapping)</p>
          {newOptions.map((o, idx) => (
            <div key={idx} style={{ marginBottom: 8 }}>
              <input
                placeholder={`Option ${idx + 1} text`}
                value={o.text}
                onChange={(e) => {
                  const copy = [...newOptions];
                  copy[idx].text = e.target.value;
                  setNewOptions(copy);
                }}
                style={{ marginRight: 8 }}
              />
              <input
                placeholder='Score mapping e.g. "tech:2,creative:1"'
                value={o.score}
                onChange={(e) => {
                  const copy = [...newOptions];
                  copy[idx].score = e.target.value;
                  setNewOptions(copy);
                }}
              />
            </div>
          ))}

          <button className="button secondary" onClick={() => setNewOptions([...newOptions, { text: "", score: "" }])}>
            Add Option
          </button>
        </div>

        <div style={{ marginTop: 12 }}>
          <button className="button" onClick={handleAddOrUpdate}>
            {editingIndex >= 0 ? "Update Question" : "Add Question"}
          </button>
          <button className="button secondary" onClick={clearForm} style={{ marginLeft: 8 }}>
            Clear
          </button>
        </div>
      </div>

      <hr />

      <div>
        <h3>Existing Questions ({items.length})</h3>
        {items.length === 0 && <p>No questions yet for this test.</p>}
        <ul>
          {items.map((q, i) => (
            <li key={i} style={{ marginBottom: 12 }}>
              <strong>{i + 1}.</strong> {q.question}
              <div style={{ marginTop: 6 }}>
                {q.options.map((opt, oi) => (
                  <div key={oi} style={{ fontSize: 14 }}>
                    - {opt.text} (scores: {Object.entries(opt.score).map(([k,v]) => `${k}:${v}`).join(", ")})
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 6 }}>
                <button className="button" onClick={() => handleEdit(i)}>Edit</button>
                <button className="button secondary" onClick={() => handleDelete(i)} style={{ marginLeft: 8 }}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ManageTests;
