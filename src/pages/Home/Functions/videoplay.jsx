import { useState } from "react";
import {MdClose } from "react-icons/md";
import { FaCirclePlay } from "react-icons/fa6";
function Video({ src ,onContextMenu}) {
    const [open, setOpen] = useState(false);
    return open ? <div className="videoPlayer">
      <video src={src} controls={true} />
      <MdClose size={50} color="#fff" className="close-button" onClick={() => { setOpen(false) }} />
    </div> :
      <div className="center" style={{ position: "relative", width: '300px', height: '300px' }} onClick={() => setOpen(true)} onContextMenu={onContextMenu}>
        <FaCirclePlay color="#fff" size={50} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
        <video style={{ width: '300px', height: '300px' }} src={src} controls={false} onClick={() => setOpen(true)} />
      </div>
  }
  export default Video;