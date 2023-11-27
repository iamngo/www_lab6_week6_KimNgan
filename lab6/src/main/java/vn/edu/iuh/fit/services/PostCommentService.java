package vn.edu.iuh.fit.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.models.PostComment;
import vn.edu.iuh.fit.models.ResponsePostComments;
import vn.edu.iuh.fit.repositories.PostCommentRepository;
import vn.edu.iuh.fit.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PostCommentService {
    @Autowired
    private PostCommentRepository postCommentRepository;
    @Autowired
    private UserRepository userRepository;

    public Optional<PostComment> findById (long id){
        return postCommentRepository.findById(id);
    }

    public boolean createPostComment(PostComment postComment){
        postCommentRepository.save(postComment);
        return true;
    }

    public List<ResponsePostComments> getPostCommentsByPostID(long id){
        List<ResponsePostComments> responsePostComments = new ArrayList<>();
        for(Object[] o : postCommentRepository.findByPostId(id)){
            System.out.println(o);
            ResponsePostComments responsePostComment = new ResponsePostComments((Boolean) o[3], o[2]+"", (Long) o[0], (Long) o[6] == null ? 0 : (Long) o[6],(Long)o[7],o[4]+"",
                    userRepository.findById((Long)o[8]).get(),(String)o[5],(String)o[1],(Long) o[9]);
            responsePostComments.add(responsePostComment);
        }
        return responsePostComments;
    }

    public List<ResponsePostComments> getPostCommentsByPostIDAndParentID(long parentID){
        List<ResponsePostComments> responsePostComments = new ArrayList<>();
        for(Object[] o : postCommentRepository.findByPostIdAndParentID(parentID)){
            ResponsePostComments responsePostComment = new ResponsePostComments((Boolean) o[3], o[2]+"", (Long) o[0], (Long) o[6] == null ? 0 : (Long) o[6],(Long)o[7],o[4]+"",
                    userRepository.findById((Long)o[8]).get(),(String)o[5],(String)o[1],(Long) o[9]);
            responsePostComments.add(responsePostComment);
        }
        return responsePostComments;
    }

    public long getCurrentPostCommentID(){
        return postCommentRepository.getCurrentPostCommentID();
    }

}
