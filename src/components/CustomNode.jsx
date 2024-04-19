import React, { memo } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import 'reactflow/dist/style.css';

const CustomNode = ({
  id,
  data,
  isConnectable,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom,
}) => {

  const { deleteElements } = useReactFlow();

  return (
    <div className="custom-nodes">
      <div className="node-name">
        {data.label}
      </div>
      <Handle
        type="target"
        position={targetPosition}
        isConnectable={isConnectable}
      />
      { data.demo &&
        <img
        className="nodrag delete-icon" 
        onClick={() => deleteElements({ nodes: [{ id }] })}
        src="x-mark.png" 
        alt="x" 
        />
      }
      <Handle
        type="source"
        position={sourcePosition}
        isConnectable={isConnectable}
      />
    </div>
  );
};

CustomNode.displayName = "CustomNode";

export default memo(CustomNode);
