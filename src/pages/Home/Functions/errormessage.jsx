
import {MdClose } from "react-icons/md";
function ErrorMessage({ error, listening, setListening, seterror }) {
    setTimeout(() => {
      if (listening) {
        setListening(false);
        seterror("");
      }
    }, 3000);
  
    return (
      listening && (
        <div className="alerterror alert-success center spacebetween">
          <span><strong>Error!</strong> {error}</span>
          <MdClose className="icon_search" onClick={() => { setListening(false); seterror("") }} />
        </div>
      )
    );
  }
  export default ErrorMessage;