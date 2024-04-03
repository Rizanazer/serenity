import { useState } from "react";
import {MdClose } from "react-icons/md";
function Image({ src,onContextMenu }) {
    const [open, setOpen] = useState(false);
    return open ? <div className="videoPlayer">
      <img src={src} />
      <MdClose size={50} color="#fff" className="close-button" onClick={() => { setOpen(false) }} />
    </div> :
      <img style={{ position: "relative", width: '300px', height: '300px' }} src={src} onClick={() => setOpen(true)} onContextMenu={onContextMenu} />
  }
  export default Image;