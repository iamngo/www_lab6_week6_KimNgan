import "./Login.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();

    let handleLogin = async () => {
        let datas = await axios.get(`http://localhost:8080/user/by-email/${email}`)
        if(datas.data !== ""){
            if (await bcrypt.compareSync(password, datas.data.passwordHash)) {
                navigate("/homepage", {
                  state: {
                    user: datas.data,
                  },
                });
        }else{
            alert("Password không chính xác!")
        }
        }else{
            alert("Email hoặc số điện thoại không chính xác!");
        }
    }


    return ( 
        <div className="container-login">
    <span className="text-login">ĐĂNG NHẬP</span>
    
    <div className="form-login-content">
        <label className="login-label">Email: </label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="login" className="login-input" 
        
        />
    </div>
    <div className="form-login-content">
        <label className="login-label">Password: </label>
        <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} id="login" className="login-input" 
       
        />
    </div>
    <button className="btn-login" onClick={handleLogin}>Đăng Nhập</button>
   
</div>
     );
}

export default Login;