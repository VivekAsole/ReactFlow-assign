import React from 'react';
import { useState, useCallback } from 'react';
import { ReactFlow, Background, useNodesState, useEdgesState, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';


import CustomNode from "./components/CustomNode";
import CustomEdge from './components/CustomEdge';


const nodeTypes = {
  custom: CustomNode
};

const edgeTypes = {
  'custom-edge': CustomEdge
}

export default function Home() {

  const [popUp, setPopUp] = useState(false)
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodeSelected, setNodeSelected] = useState({})
  const [nodeName, setNodeName] = useState('');

  const onConnect = useCallback(
    (connection) => {
      const edge = { ...connection, type: 'custom-edge', data: { showX: false } };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges],
  );

  function handleAddNode() {
    const newNode = {
      id: `${nodes.length + 1}`,
      position: { x: 10, y: 25 },
      data: { label: 'New Node', demo: false },
      type: "custom",
    }
    setNodes([...nodes, newNode])
  }

  const handleNodeSelection = (node) => {
    setPopUp(true)
    setNodeName(node.data.label)
    setNodeSelected({
      id: node.id
    })
  }

  const handleNameUpdate = () => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeSelected.id) {
          node.data = {
            ...node.data,
            label: nodeName,
          }
        }
        return node;
      }
      ))
    setPopUp(false)
    setNodeSelected({})
  }

  const handleMouseEnter = (current_node) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === current_node.id) {
          node.data = {
            ...node.data,
            demo: true,
          }
        }
        return node;
      }
      ))
  }

  const handleMouseLeave = () => {
    setNodes((nds) =>
      nds.map((node) => {
        node.data = {
          ...node.data,
          demo: false,
        }
        return node;
      }
      ))
  }

  const onDeleteNode = () => {
    setTimeout(() => {
      setPopUp(false)
    }, 1);
  }

  const handleEdgeEnter = (current_edge) => {
    setEdges((nds) =>
      nds.map((edge) => {
        if (edge.id === current_edge.id) {
          edge.data = {
            showX: true,
          }
        }
        return edge;
      }
      ))
  }

  const handleEdgeLeave = () => {
    setEdges((nds) =>
      nds.map((edge) => {
        edge.data = {
          showX: false,
        }
        return edge;
      }
      ))
  }


  return (
    <div>
      <button
        className='add-node-btn'
        onClick={handleAddNode}
      >
        Create Node
      </button>
      <div className='container'>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(_, node) => handleNodeSelection(node)}
          onNodeMouseEnter={(_, current_node) => handleMouseEnter(current_node)}
          onNodeMouseLeave={handleMouseLeave}
          onNodesDelete={onDeleteNode}
          onEdgeMouseEnter={(_, current_edge) => handleEdgeEnter(current_edge)}
          onEdgeMouseLeave={handleEdgeLeave}
        >
          <Background />
          {popUp
            && <div className='popUp'>
              <label htmlFor="">Change the Name</label>
              <input
                type="text"
                value={nodeName}
                onChange={(e) => setNodeName(e.target.value)}
              />
              <button
                className='cancel-btn'
                onClick={() => {
                  setPopUp(false)
                  setNodeSelected()
                  setNodeName('')
                }}
              >
                Cancel
              </button>
              <button
                className='change-btn'
                onClick={handleNameUpdate}
              >
                Save
              </button>
            </div>
          }
        </ReactFlow>
      </div>
    </div>
  );
}