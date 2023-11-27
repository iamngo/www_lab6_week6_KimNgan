package vn.edu.iuh.fit.controlllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.models.Post;
import vn.edu.iuh.fit.models.ResponseObject;
import vn.edu.iuh.fit.services.PostService;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/post")
@CrossOrigin(origins = "*")
public class PostController {
    @Autowired
    private PostService postService;

    @PostMapping
    public Post createPost(@RequestBody Post post){
        post.setCreatedAt(Instant.now());
        post.setUpdatedAt(Instant.now());
        post.setPublishedAt(Instant.now());
        return postService.createPost(post).orElse(null);
    }

    @GetMapping
    public ResponseEntity<ResponseObject> findAllPost(){
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("OK","success",postService.findAllPost()));
    }

    @GetMapping("/current-post-id")
    public long getCurrentPostId(){
        return postService.getCurrentPostId();
    }
}
