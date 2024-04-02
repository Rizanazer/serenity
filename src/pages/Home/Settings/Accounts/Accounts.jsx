import { useEffect, useState } from "react";
import "./Accounts.css";
import { MdEdit, MdEditOff, MdDone } from "react-icons/md";
import Translate from "pages/Home/Settings/Accounts/translation_Settings";
// import DropdownInput from "pages/Home/Functions/dropdownbox/dropdowninput";
import axios from "axios";
function AccountSettings({ Email, Mobile, Gender, DOB, Password, setGender, setDOB, setPassword, setEmail,
    setMobile }) {
    const [EditEmail, setEditEmail] = useState(null);
    const [EditPhone, setEditPhone] = useState(null);
    const [EditPassword, setEditPassword] = useState(null);
    const [EditDOB, setEditDOB] = useState(null);
    const [EditGender, setEditGender] = useState(null);
    const [text, setText] = useState("");
    const [outText, setOutText] = useState("");
    const [language, setLanguage] = useState(null);

    const userdata = JSON.parse(localStorage.getItem('userdata'))
    function ToggleMobileEdit() {
        setMobile(prev => !prev);
        setDOB(false);
        setPassword(false);
        setEmail(false)
    }
    function ToggleEmailEdit() {
        setEmail(prev => !prev);
        setDOB(false);
        setPassword(false);
        setMobile(false);
    }
    function ToggleGenderEdit() {
        setGender(prev => !prev);
        setDOB(false);
        setPassword(false);
        setEmail(false)
        setMobile(false);
    }
    function ToggleDOBEdit() {
        setDOB(prev => !prev);
        setGender(false);
        setPassword(false);
        setEmail(false)
        setMobile(false);
    }
    function TogglePasswordEdit() {
        setPassword(prev => !prev);
        setDOB(false);
        setGender(false);
        setEmail(false)
        setMobile(false);
    }
    function convertToYYYYMMDD(dobISO8601) {
        const dobDate = new Date(dobISO8601);
        const year = dobDate.getFullYear();
        const month = String(dobDate.getMonth() + 1).padStart(2, '0');
        const day = String(dobDate.getDate()).padStart(2, '0');
        const yyyyMMdd = `${year}-${month}-${day}`;
        return yyyyMMdd;
    }
    function convertToISO8601(dateString) {
        const [year, month, day] = dateString.split('-');
        const date = new Date(year, month - 1, day);
        const iso8601Date = date.toISOString();
        return iso8601Date;
    }
    const handleGenderData = async () => {
        try {
            await axios.post('/updateProfile', {
                id: userdata._id,
                gender: EditGender
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            // setStatus(Status);
            //   console.log("##################", Status)
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };
    const handleLanguageData = async () => {
        try {
            await axios.post('/updateProfile', {
                id: userdata._id,
                language: language
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            // setStatus(Status);
            //   console.log("##################", Status)
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };
    const handleAgeData = async () => {
        try {
            await axios.post('/updateProfile', {
                id: userdata._id,
                dob: convertToISO8601(EditDOB)
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            // setStatus(Status);
            //   console.log("##################", Status)
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };
    const handleEmailData = async () => {
        try {
            await axios.post('/updateProfile', {
                id: userdata._id,
                email: EditEmail
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            // setStatus(Status);
            //   console.log("##################", Status)
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };
    const handleMobileData = async () => {
        try {
            await axios.post('/updateProfile', {
                id: userdata._id,
                phone: EditPhone
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            // setStatus(Status);
            //   console.log("##################", Status)
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handlePasswordData = async () => {
        try {
            await axios.post('/updateProfile', {
                id: userdata._id,
                password: EditPassword
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            // setStatus(Status);
            //   console.log("##################", Status)
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    async function fetchProfileUpdate() {
        const u_id = localStorage.getItem('userid')
        try {
            const response = await axios.post("/fetchProfile", { u_id: u_id, })
            // console.log( "##################" ,response.data.status)
            setEditEmail(response.data.email)
            setEditPassword(response.data.password)
            setEditPhone(response.data.phone)
            setEditDOB(convertToYYYYMMDD(response.data.dob))
            setEditGender(response.data.gender)
            setLanguage(response.data.language)
        } catch (error) {
            console.log("error fetching Status")
        }
    }
    useEffect(() => {
        setLanguage(userdata.language)
        setEditGender(userdata.gender)
        setEditDOB(convertToYYYYMMDD(userdata.dob))
        setEditEmail(userdata.email)
        setEditPhone(userdata.phone)
        setEditPassword(userdata.password)
        fetchProfileUpdate()
    }, []);
    const NumberCheck = (event) => {
        const inputValue = event.target.value;
        const numbersOnly = inputValue.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
        event.target.value = numbersOnly; // Update the input value to contain only numbers
        setEditPhone(event.target.value)
    };
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
                            <div className="flex flexrow gap10">
                                <span className="light">Email :</span>
                                {Email ?
                                    <>
                                        <input type="text" className="bold edit_account_elmt padding10" value={EditEmail}
                                            onChange={(event) => { setEditEmail(event.target.value) }} />
                                        <MdDone className="violetHover" onClick={() => { handleEmailData() }} />
                                        <MdEditOff className="violetHover" onClick={() => { ToggleEmailEdit() }} />

                                    </>
                                    :
                                    <>
                                        <span className="bold textlength_head ">{EditEmail}</span>
                                        <MdEdit className="violetHover" onClick={() => { ToggleEmailEdit() }} />
                                    </>}

                                {/* <MdEdit className="violetHover"/> */}
                            </div>
                            <div className="flex flexrow gap10 ">
                                <span className="light">Mobile No :</span>
                                {Mobile ?
                                    <>
                                        <input className="bold edit_account_elmt padding10" value={EditPhone}
                                            onChange={NumberCheck} maxLength={10} />
                                        <MdDone className="violetHover" onClick={() => { handleMobileData() }} />
                                        <MdEditOff className="violetHover" onClick={() => { ToggleMobileEdit() }} />

                                    </>
                                    :
                                    <>
                                        <span className="bold">{EditPhone}</span>
                                        <MdEdit className="violetHover" onClick={() => { ToggleMobileEdit() }} />
                                    </>}

                                {/* <MdEdit className="violetHover"/> */}
                            </div>
                            <div className="flex flexrow gap10 ">
                                <span className="light">Password :</span>
                                {Password ?
                                    <>
                                        <input type="text" className="bold edit_account_elmt padding10" value={EditPassword}
                                            onChange={(event) => { setEditPassword(event.target.value) }} />
                                        <MdDone className="violetHover" onClick={() => { handlePasswordData() }} />
                                        <MdEditOff className="violetHover" onClick={() => { TogglePasswordEdit() }} />

                                    </>
                                    :
                                    <>
                                        <span className="bold">{EditPassword}</span>
                                        <MdEdit className="violetHover" onClick={() => { TogglePasswordEdit() }} />
                                    </>}


                            </div>
                            <hr className='line' />
                            <div className="flex flexrow gap10 ">
                                <span className="light">Gender :</span>
                                {Gender ?
                                    <>
                                        <input type="text" className="bold edit_account_elmt padding10" value={EditGender}
                                            onChange={(event) => { setEditGender(event.target.value) }} />
                                        <MdDone className="violetHover" onClick={() => { handleGenderData() }} />
                                        <MdEditOff className="violetHover" onClick={() => { ToggleGenderEdit() }} />
                                    </>
                                    :
                                    <>
                                        <span className="bold">{EditGender}</span>
                                        <MdEdit className="violetHover" onClick={() => { ToggleGenderEdit() }} />
                                    </>}

                            </div>
                            <div className="flex flexrow gap10 ">
                                <span className="light">Date of Birth :</span>
                                {DOB ?
                                    <>
                                        <input className="bold edit_account_elmt padding10" value={EditDOB}
                                            onChange={(event) => { setEditDOB(event.target.value) }}
                                        />
                                        <MdDone className="violetHover" onClick={() => { handleAgeData() }} />
                                        <MdEditOff className="violetHover" onClick={() => { ToggleDOBEdit() }} />
                                    </>
                                    :
                                    <>
                                        <span className="bold">{EditDOB}</span>
                                        <MdEdit className="violetHover" onClick={() => { ToggleDOBEdit() }} />
                                    </>}

                            </div>
                            <hr className='line' />
                        </div>
                        <div className="box basicprofileinfo flex flexcolumn gap10">
                            <div className="flex flexrow gap10 center">
                                <span className="light">Choose Language to be Translated:</span>
                                <select id='dropmenu' onChange={(event)=>{setLanguage(event.target.value);handleLanguageData()}} value={language}>
                                    {<option value="en">English</option>}
                                    {<option value="es">Spanisxh</option>}
                                    <option value="ml">Malayalam</option>
                                    <option value="ta">Tamil</option>
                                    <option value="ar">Arabic</option>
                                </select>
                                <MdDone className="violetHover" onClick={() => { handleLanguageData() }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
export default AccountSettings;