import { useState } from "react";
import {MdClose } from "react-icons/md";
function Image({ src }) {
    const [open, setOpen] = useState(false);
    return open ? <div className="videoPlayer">
      <img src={src} />
      <MdClose size={50} color="#fff" className="close-button" onClick={() => { setOpen(false) }} />
    </div> :
      <img style={{ width: '300px', height: '300px' }} src={src} onClick={() => setOpen(true)} />
  }
  export default Image;