import { MdArrowBack,MdOutlinePersonAddAlt,MdMessage } from "react-icons/md";
import { IoMdHeartDislike } from "react-icons/io";
var SideScreenFn = ({handleClick}) => {
    return (
        <>
            <div className="section3_back">
                <MdArrowBack className="icon nobordershadow" onClick={()=>{handleClick()}}/>
            </div>
            <div className="section3_1">
                <div className="section3_1_1">
                    <img src="images/profilepic.jpg" className="section3_1_1" alt="" />
                </div>
                <div className="section3_1_2 center flexcolumn">
                    {/* continue from here */}
                    <div className="section3_textArea profile_text">
                    <span className="bold">username</span>
                    <span className="light">status_text</span>
                    </div>
                    <div className="section3_features">
                        <MdOutlinePersonAddAlt className="icon"/>
                        <MdMessage className="icon"/>
                        <IoMdHeartDislike className="icon"/>
                    </div>
                    
                </div>
            </div>
            <div className="section3_2">

            </div>
            <div className="section3_3">

            </div>
        </>
    );

}
export default SideScreenFn;