import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";


const Comment = ({ cmt, viewID }) => {
  let location = useLocation();

  const [data, setData] = useState([]);
  const [viewReply, setViewReply] = useState(viewID);
  const [showInputComment, setShowInputComment] = useState({
    id: 0,
    postID: 0,
  });
  const [txtComment, setTxtComment] = useState("");
  let handlePressViewReply = async (id) => {
    let datas = await axios.get(
      `http://localhost:8080/post-comment/parent-${id}`
    );
    setData(datas.data);
    setViewReply("");
  };

  let handleClickReply = (data) => {
    setShowInputComment({ id: data.id, postID: data.postID });
  };

  let handleClickSend = async(cmt) => {
    console.log(cmt);
    let dataID = await axios.get("http://localhost:8080/post-comment/current-post-comment-id")
    let datas = await axios.post(`http://localhost:8080/post-comment/${cmt.postID}/${cmt.id}`,{
      id : dataID.data + 1,
      title : txtComment.split(":")[0],
      user : location.state.user,
      published : true,
      content : txtComment.split(":")[1]
    });
    setTxtComment("");
    setShowInputComment({});
    if(datas){
      handlePressViewReply(cmt.id);
    }
    
  }
  return (
    <div key={cmt.id} className="modal-comments">
      <div className="form-comment">
        <i className="fa-solid fa-user icon-user"></i>
        <div className="comment">
          <span className="name"><b>{`${cmt.user.firstName} ${cmt.user.middleName} ${cmt.user.lastName}`}</b></span>
          <span>{`${cmt.title} : ${cmt.content}`}</span>
        </div>
      </div>
      <div className="form-feature-input">
        <div className="form-feature">
          <span className="txt-feature">Like</span>
          <span className="txt-feature" onClick={() => handleClickReply(cmt)}>
            Reply
          </span>
        </div>
        {showInputComment.id === cmt.id &&
        showInputComment.postID === cmt.postID ? (
          <div className="input-comment">
            <input
              value={txtComment}
              type="text"
              placeholder="Comment..."
              onChange={(e) => setTxtComment(e.target.value)}
            />
            <i className="fa-solid fa-location-arrow icon-send" onClick={() => handleClickSend(cmt)}></i>
          </div>
        ) : null}
      </div>
      {cmt.quantityCommentChildren > 0 && viewReply === cmt.id ? (
        <span
          className="view-reply"
          onClick={() => handlePressViewReply(cmt.id)}
        >
          {`View ${cmt.quantityCommentChildren} reply`} <i className="fa-solid fa-reply"></i>
        </span>
      ) : null}
      <div style={{ marginLeft: "45px" }}>
        {data.map((dt) => (
          <Comment key={dt.id} cmt={dt} viewID={dt.id} />
        ))}
      </div>
    </div>
  );
};

export default Comment;