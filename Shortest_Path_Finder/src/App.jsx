// // import React, { useState } from "react";
// // import "./App.css";

// // const numRows = 13;
// // const numCols = 30;

// // export default function App() {
// //   const [nodes, setNodes] = useState([]);

// //   const handleCellClick = (row, col) => {
// //     // Avoid duplicate node creation
// //     const exists = nodes.some(node => node.row === row && node.col === col);
// //     if (!exists) {
// //       setNodes([...nodes, { row, col }]);
// //     }
// //   };

// //   const renderGrid = () => {
// //     const grid = [];
// //     for (let row = 0; row < numRows; row++) {
// //       const cols = [];
// //       for (let col = 0; col < numCols; col++) {
// //         const isNode = nodes.some(node => node.row === row && node.col === col);
// //         cols.push(
// //           <div
// //             key={`${row}-${col}`}
// //             className={`cell ${isNode ? "node" : ""}`}
// //             onClick={() => handleCellClick(row, col)}
// //           />
// //         );
// //       }
// //       grid.push(
// //         <div key={row} className="grid-row">
// //           {cols}
// //         </div>
// //       );
// //     }
// //     return grid;
// //   };

// //   return (
// //     <div className="grid">
// //       {renderGrid()}
// //     </div>
// //   );
// // }


// import React, { useState } from "react";
// import "./App.css";

// const numRows = 20;
// const numCols = 40;

// export default function App() {
//   const [nodes, setNodes] = useState([]);

//   const handleCellClick = (row, col) => {
//     const exists = nodes.some(node => node.row === row && node.col === col);
//     if (!exists) {
//       const nodeNumber = nodes.length;
//       setNodes([...nodes, { row, col, number: nodeNumber }]);
//     }
//   };

//   const renderGrid = () => {
//     const grid = [];
//     for (let row = 0; row < numRows; row++) {
//       const cols = [];
//       for (let col = 0; col < numCols; col++) {
//         const node = nodes.find(n => n.row === row && n.col === col);
//         cols.push(
//           <div
//             key={`${row}-${col}`}
//             className="cell"
//             onClick={() => handleCellClick(row, col)}
//           >
//             {node && (
//               <div className="node">
//                 <span className="node-number">{node.number}</span>
//               </div>
//             )}
//           </div>
//         );
//       }
//       grid.push(
//         <div key={row} className="grid-row">
//           {cols}
//         </div>
//       );
//     }
//     return grid;
//   };

//   return <div className="grid">{renderGrid()}</div>;
// }


import React, { useState } from "react";
import Grid from "./Grid";
import Controls from "./Controls";
import "./App.css";

function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [edgeMode, setEdgeMode] = useState(false);
  const [edgeNodes, setEdgeNodes] = useState([]);
  const [weight, setWeight] = useState("");

  const handleAddNode = (row, col) => {
    const exists = nodes.some(n => n.row === row && n.col === col);
    if (!exists) {
      const nodeNumber = nodes.length;
      setNodes([...nodes, { row, col, number: nodeNumber }]);
    }
  };

  const handleNodeClick = (node) => {
    if (!edgeMode) return;

    if (edgeNodes.length === 0) {
      setEdgeNodes([node]);
    } else if (edgeNodes.length === 1) {
      const first = edgeNodes[0];
      const second = node;

      const exists = edges.some(
        e =>
          (e.from === first.number && e.to === second.number) ||
          (e.from === second.number && e.to === first.number)
      );

      if (!exists && first.number !== second.number) {
        setEdges([...edges, { from: first.number, to: second.number, weight }]);
      }

      setEdgeNodes([]);
      setEdgeMode(false);
      setWeight("");
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Graph Visualizer</h2>
      <Controls
        weight={weight}
        setWeight={setWeight}
        setEdgeMode={setEdgeMode}
        edgeMode={edgeMode}
      />
      <Grid
        nodes={nodes}
        edges={edges}
        onCellClick={handleAddNode}
        onNodeClick={handleNodeClick}
      />
    </div>
  );
}

export default App;
