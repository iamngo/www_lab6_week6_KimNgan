package vn.edu.iuh.fit.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.models.Post;
import vn.edu.iuh.fit.repositories.PostRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;
    public Post findById(long id){
        return postRepository.findById(id).get();
    }

    public Optional<Post> createPost(Post post){
        return Optional.of(postRepository.save(post));
    }

    public List<Post> findAllPost(){
        return postRepository.findAllOrderByPublishedAtDesc();
    }

    public long getCurrentPostId(){
        return postRepository.getCurrentPostID();
    }
}
