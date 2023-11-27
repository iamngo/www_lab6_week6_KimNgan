package vn.edu.iuh.fit.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Data
@Table(name = "post_comment")
@ToString
@NoArgsConstructor
public class PostComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "postId")
    @JsonIgnore
    private Post post;
    private String title;
    @OneToMany(mappedBy = "parent")
    @JsonIgnore
    private Set<PostComment> postComments = new LinkedHashSet<>();
    private Boolean published;
    private String content;
    private Instant publishedAt;
    private Instant createdAt;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parentId")
    @JsonIgnore
    private PostComment parent;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    public PostComment( Post post, String title, Set<PostComment> postComments, Boolean published, String content, Instant publishedAt, Instant createdAt, PostComment parent, User user) {
        this.post = post;
        this.title = title;
        this.postComments = postComments;
        this.published = published;
        this.content = content;
        this.publishedAt = publishedAt;
        this.createdAt = createdAt;
        this.parent = parent;
        this.user = user;
    }
}
