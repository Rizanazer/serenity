import "./Accounts.css";
import { MdEdit } from "react-icons/md";
function AccountSettings() {
    return (
        <>
            <div className="h_w_full flex flexrow  zindex2 profile_whole">
                <div className="triangle account_triangle_position flex"></div>
                <div className="box profilesection flex flexrow center">

                    <div className="section1 profilesection2 flex flexcolumn gap20">
                        <span className="box padding20 delete_self center nobordershadow">Delete Account</span>
                        <span className="box padding20 delete_self center nobordershadow" onClick={() => { }}>Update Account</span>


                    </div>

                    <div className="section2 profilesection1 flex flexcolumn">
                        <div className=" box joinbtn center padding20 redHover" onClick={() => { }}>Delete Account</div>
                        <div className="box basicprofileinfo flex flexcolumn gap10">
                          <div className="flex flexrow gap10 center">
                                <span className="light">Email :</span>
                                <span className="bold">email@email.com</span>
                                <MdEdit className="violetHover"/>
                            </div>
                            <div className="flex flexrow gap10 center">
                                <span className="light">Mobile No :</span>
                                <span className="bold">9544914457</span>
                                <MdEdit className="violetHover"/>
                            </div>
                            <div className="flex flexrow gap10 center">
                                <span className="light">Password :</span>
                                <span className="bold">****</span>
                                <MdEdit className="violetHover"/>
                            </div>
                            <hr className='line' />
                            <div className="flex flexrow gap10 center">
                                <span className="light">Gender :</span>
                                <span className="bold">Male</span>
                                <MdEdit className="violetHover"/>
                            </div>
                            <div className="flex flexrow gap10 center">
                                <span className="light">Date of Birth :</span>
                                <span className="bold">23/04/2001</span>
                                <MdEdit className="violetHover"/>
                            </div>
                            <hr className='line' />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
export default AccountSettings;