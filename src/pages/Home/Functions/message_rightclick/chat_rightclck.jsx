// import { MdDelete,} from "react-icons/md";
// function rightBox({rightclk,setrightclk,deletemsgfn}){
//     return(
//             rightclk && <div className="box padding10">
//               <div className="box nopadding more_items" onClick={() => { 
//                 deletemsgfn();
//                 setrightclk(false);
//               }}>
//                 <div className="bold">
//                   <div className="neration flexrow"><MdDelete className="icon_search" />delete</div>
//                 </div>
//               </div>
//             </div>
//     );
// }
// export default rightBox;
import React, { useState } from 'react';

const RightClickBox = () => {
  const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 });
  const [showBox, setShowBox] = useState(false);

  const handleRightClick = (e) => {
    e.preventDefault();
    setShowBox(true);
    setBoxPosition({ x: e.clientX, y: e.clientY });
  };

  const handleBoxClose = () => {
    setShowBox(false);
  };

  return (
    <div
      style={{ width: '100%', height: '100vh', position: 'relative' }}
      onContextMenu={handleRightClick}
    >
      {showBox && (
        <div
          style={{
            position: 'absolute',
            top: boxPosition.y,
            left: boxPosition.x,
            background: '#ffffff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            borderRadius: '4px',
            padding: '8px',
            zIndex: 999,
          }}
        >
          <p>This is your right-click box!</p>
          <button onClick={handleBoxClose}>Close</button>
        </div>
      )}
    </div>
  );
};

export default RightClickBox;
