import './HomePage.scss';
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import FormAdd from "./formAdd";
import Comment from './components/Comment';


const HomePage = () => {
    let location = useLocation();

    const [postDatas, setPostDatas] = useState([]);
    const [postComments, setPostComments] = useState([]);
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [txtComment, setTxtComment] = useState([]);
    useEffect(() => {
        let apiGetPostDatas = async () => {
          let datas = await axios.get("http://localhost:8080/post");
          setPostDatas(datas.data.datas);
          setTxtComment(datas.data.datas.map(dt => ({postID : dt.id, value : ""})));
        };
        apiGetPostDatas();
      }, [visibleAdd]);

    const handleClickAdd = () => {
        setVisibleAdd(!visibleAdd);
    };

    let handleClickComment = async (id) => {
        let datas = await axios.get(`http://localhost:8080/post-comment/by-post-${id}`);
        setPostComments(datas.data);
        console.log(datas.data);
    };
    let handleClickSend = async(post) => {
        let datas = await axios.post(`http://localhost:8080/post-comment/${post.id}`,{
          title : txtComment.find(dt => dt.postID === post.id).value.split(":")[0],
          user : location.state.user,
          published : true,
          content : txtComment.find(dt => dt.postID === post.id).value.split(":")[1]
        });
        setTxtComment(prev => {
          let current = [...prev]
          current.find(dt => dt.postID === post.id).value = ""
          return current;
        })
        if(datas){
            handleClickComment(post.id);
        }
        
      }

    return ( 
    <div className="container">
        <FormAdd 
            visible={visibleAdd}
            setVisible={setVisibleAdd}
            user={location.state.user}/>
        <div className="header">
            <button onClick={handleClickAdd}>Tạo bài viết</button>
        </div>
        <div className="blogs">
            {postDatas.filter((post) => post.published === true).map((p) => (
                <div key={p.id} className="blog">
                    <div className="content-blog">
                        <div className="content-user">
                            <div className="avt"><i className="fa-solid fa-user icon-user"></i></div>
                            <div className='content-user-name'>
                                <div className="username">{`${p.author.firstName} ${p.author.middleName} ${p.author.lastName}`}</div>
                                <div className="time"><span>{`${p.publishedAt.slice(11,16)}  ${p.publishedAt.slice(8,10)}-${p.publishedAt.slice(5, 7)}-${p.publishedAt.slice(0,4)}`}</span></div>
                            </div>
                        </div>
                        <div className="content">
                            <span className="content-title"><p><b>Title: {p.title}</b></p></span>
                            <span className="content-meta-title"><p>Meta title: {p.metaTitle}</p></span>
                            <span className="content-content"><p><b>Content:</b> {p.content}</p></span>
                            <span className="content-summary"><p><b>Summary:</b> {p.summary}</p></span>
                        </div>
                    </div>
                    <div className="content-feature">
                        <i className="fa-solid fa-thumbs-up icon-feature"><span> Like</span></i>
                        <i className="fa-solid fa-comment icon-feature" onClick={() => handleClickComment(p.id)}><span> Comment</span></i>
                        <i className="fa-solid fa-share icon-feature"><span> Share</span></i>
                    </div>
                    <div className="content-comment">
                    {postComments.length > 0 ? postComments[0].postID === p.id ? postComments.map((cmt) => (
                        <Comment key={cmt.id} cmt={cmt} viewID={cmt.id}/>
                      )) : null : null}
                        <div className="input-comment">
                            <input 
                                type="text"
                                placeholder='Comment...'
                                value={txtComment.find(dt => dt.postID === p.id).value}
                                onChange={(e) => setTxtComment(prev => {
                                    let current = [...prev]
                                    current.find(dt => dt.postID === p.id).value = e.target.value
                                    return current
                                  })}
                            />
                            <i className="fa-solid fa-location-arrow icon-send" onClick={() => handleClickSend(p)}></i>
                        </div>
                    </div>
                </div>
            ))}
            
        </div>
    </div>
     );
}

export default HomePage;