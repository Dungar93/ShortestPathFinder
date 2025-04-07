// // import React from "react";

// // const numRows = 20;
// // const numCols = 40;

// // export default function Grid({ nodes, edges, onCellClick, onNodeClick }) {
// //   const getNodeByNumber = (num) => nodes.find(n => n.number === num);

// //   const toPixel = (index) => index * 30 + 15;

// //   return (
// //     <div className="grid">
// //       <svg className="edge-layer">
// //         {edges.map((edge, i) => {
// //           const from = getNodeByNumber(edge.from);
// //           const to = getNodeByNumber(edge.to);
// //           if (!from || !to) return null;

// //           const x1 = toPixel(to.col);
// //           const y1 = toPixel(to.row);
// //           const x2 = toPixel(from.col);
// //           const y2 = toPixel(from.row);
// //           const midX = (x1 + x2) / 2;
// //           const midY = (y1 + y2) / 2;

// //           return (
// //             <g key={i}>
// //               <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" />
// //               <text x={midX} y={midY - 5} fontSize="12px" textAnchor="middle" fill="red">
// //                 {edge.weight}
// //               </text>
// //             </g>
// //           );
// //         })}
// //       </svg>

// //       {Array.from({ length: numRows }).map((_, row) => (
// //         <div key={row} className="grid-row">
// //           {Array.from({ length: numCols }).map((_, col) => {
// //             const node = nodes.find(n => n.row === row && n.col === col);
// //             return (
// //               <div
// //                 key={`${row}-${col}`}
// //                 className="cell"
// //                 onClick={() =>
// //                   node ? onNodeClick(node) : onCellClick(row, col)
// //                 }
// //               >
// //                 {node && (
// //                   <div className="node">
// //                     <span className="node-number">{node.number}</span>
// //                   </div>
// //                 )}
// //               </div>
// //             );
// //           })}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }


// import React, { useEffect, useRef, useState } from "react";

// const numRows = 20;
// const numCols = 40;

// export default function Grid({ nodes, edges, onCellClick, onNodeClick }) {
//   const containerRef = useRef(null);
//   const [positions, setPositions] = useState({});

//   const nodeRefs = useRef({});

//   // Track node positions
//   useEffect(() => {
//     const newPositions = {};
//     nodes.forEach((node) => {
//       const ref = nodeRefs.current[node.number];
//       if (ref) {
//         const rect = ref.getBoundingClientRect();
//         const containerRect = containerRef.current.getBoundingClientRect();
//         newPositions[node.number] = {
//           x: rect.left - containerRect.left + rect.width / 2,
//           y: rect.top - containerRect.top + rect.height / 2,
//         };
//       }
//     });
//     setPositions(newPositions);
//   }, [nodes]);

//   return (
//     <div className="grid" ref={containerRef}>
//       <svg className="edge-layer">
//         {edges.map((edge, i) => {
//           const from = positions[edge.from];
//           const to = positions[edge.to];
//           if (!from || !to) return null;

//           const midX = (from.x + to.x) / 2;
//           const midY = (from.y + to.y) / 2;

//           return (
//             <g key={i}>
//               <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="black" />
//               <text x={midX} y={midY - 5} fontSize="12px" textAnchor="middle" fill="red">
//                 {edge.weight}
//               </text>
//             </g>
//           );
//         })}
//       </svg>

//       {Array.from({ length: numRows }).map((_, row) => (
//         <div key={row} className="grid-row">
//           {Array.from({ length: numCols }).map((_, col) => {
//             const node = nodes.find(n => n.row === row && n.col === col);
//             return (
//               <div
//                 key={`${row}-${col}`}
//                 className="cell"
//                 onClick={() =>
//                   node ? onNodeClick(node) : onCellClick(row, col)
//                 }
//               >
//                 {node && (
//                   <div
//                     className="node"
//                     ref={(el) => (nodeRefs.current[node.number] = el)}
//                   >
//                     <span className="node-number">{node.number}</span>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       ))}
//     </div>
//   );
// }


import React, { useEffect, useRef, useState } from "react";

const numRows = 16;
const numCols = 30;

export default function Grid({ nodes, edges, onCellClick, onNodeClick }) {
  const containerRef = useRef(null);
  const [positions, setPositions] = useState({});
  const nodeRefs = useRef({});

  useEffect(() => {
    const newPositions = {};
    nodes.forEach((node) => {
      const ref = nodeRefs.current[node.number];
      if (ref && containerRef.current) {
        const rect = ref.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        newPositions[node.number] = {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
        };
      }
    });
    setPositions(newPositions);
  }, [nodes]);

  return (
    <div className="grid-container" ref={containerRef}>
      <svg className="edge-layer">
      {edges.map((edge, i) => {
  const from = positions[edge.from];
  const to = positions[edge.to];
  if (!from || !to) return null;

  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.sqrt(dx * dx + dy * dy);

  const radius = 13; // Half of your node size (22px diameter)

  const offsetX = (dx / length) * (radius);
  const offsetY = (dy / length) * (radius);

  const startX = from.x + offsetX;
  const startY = from.y + offsetY;
  const endX = to.x - offsetX;
  const endY = to.y - offsetY;

  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;

  return (
    <g key={i}>
      <line x1={startX} y1={startY} x2={endX} y2={endY} stroke="black" strokeWidth={2} />

      <text
  x={midX}
  y={midY - 5}
  fontSize="14px"
  fontFamily="Courier New, monospace"
  fontWeight="bold"
  textAnchor="middle"
  fill="#3498db"
>
  {edge.weight}
</text>

    </g>
  );
})}

      </svg>

      <div className="grid">
        {Array.from({ length: numRows }).map((_, row) => (
          <div key={row} className="grid-row">
            {Array.from({ length: numCols }).map((_, col) => {
              const node = nodes.find((n) => n.row === row && n.col === col);
              return (
                <div
                  key={`${row}-${col}`}
                  className="cell"
                  onClick={() =>
                    node ? onNodeClick(node) : onCellClick(row, col)
                  }
                >
                  {node && (
                    <div
                      className="node"
                      ref={(el) => (nodeRefs.current[node.number] = el)}
                    >
                      <span className="node-number">{node.number}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
