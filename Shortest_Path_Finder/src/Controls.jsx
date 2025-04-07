import React from "react";

export default function Controls({ weight, setWeight, setEdgeMode, edgeMode }) {
  return (
    <div className="controls">
      <button onClick={() => setEdgeMode(true)} disabled={edgeMode}>
        Add Edge
      </button>
      <input
        type="number"
        placeholder="Weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        disabled={!edgeMode}
      />
    </div>
  );
}
