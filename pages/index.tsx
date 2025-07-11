import { useState } from "react";

const scoreMapping = {
  "Terrible": 1,
  "Bad": 2,
  "Average": 3,
  "Good": 4,
  "Beyond-Expectation": 5,
};

const structure = [
  {
    category: "Single Binary & Automation",
    weight: 0.5,
    factors: [
      "Automation rate on Commit/Daily/Weekly/Pre-Release",
      "Daily run: 20% pre bring-up + 80% post bring-up",
      "Any failure with ADO BUG to keep tracking",
      "Any feature/bug fix with test case pair",
      "Test case for any feature/bug fix with full regression(Commit/Daily)",
      "Low test coverage escape",
      "Bring-up NUDD CC rate",
      "Use MSFT daily release binary to power on(N-1)",
      "After bring up, PR back to main branch by 1 week",
    ],
  },
  {
    category: "Project PR/Validation Quality",
    weight: 0.3,
    factors: [
      "PR Quality: 來回次數小於3",
      "PR Review/Communication Efficiency: 提早3天送出PR",
      "Build Block validation Schedule on time: 主動規劃",
      "Build Block validation report quality: 沒有偷懶且有明確判定",
      "Active Response: 主動回報任何問題與進度",
    ],
  },
  {
    category: "NUDD",
    weight: 0.2,
    factors: [
      "Contribute NUDD test procedures # before MSFT",
      "First PR # entering main branch for NUDD feature(same score if same week)",
      "First CC # on ADO(State: Pre-Existing)",
      "First FC # on ADO(State: Done)",
    ],
  },
];

export default function Home() {
  const [scores, setScores] = useState({});

  const handleSelect = (factor, value) => {
    setScores((prev) => ({ ...prev, [factor]: value }));
  };

  const calculateScore = () => {
    let total = 0;
    structure.forEach(({ category, weight, factors }) => {
      const sum = factors.reduce((acc, f) => acc + (scoreMapping[scores[f]] || 0), 0);
      const normalized = sum / (factors.length * 5);
      total += normalized * 5 * weight;
    });
    return (total + 0.6).toFixed(2);
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#000", color: "#fff", minHeight: "100vh" }}>
      {structure.map(({ category, factors }) => (
        <div key={category} style={{ marginBottom: 20 }}>
          <h2><b>{category}</b></h2>
          {factors.map((factor) => (
            <div key={factor} style={{ margin: "10px 0" }}>
              <label>{factor}</label><br />
              <select
                onChange={(e) => handleSelect(factor, e.target.value)}
                style={{
                  backgroundColor: "#222",
                  color: "#fff",
                  border: "1px solid #555",
                  padding: "4px",
                  borderRadius: "4px"
                }}
              >
                <option value="">-- Select Rating --</option>
                {Object.keys(scoreMapping).map((label) => (
                  <option key={label} value={label}>{label}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      ))}
      <button
        onClick={() => alert(`Final Score: ${calculateScore()}`)}
        style={{
          backgroundColor: "#1e90ff",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          marginTop: "20px",
          cursor: "pointer"
        }}
      >
        計算總分
      </button>
    </div>
  );
}
