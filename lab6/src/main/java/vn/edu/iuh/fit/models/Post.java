package vn.edu.iuh.fit.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "post")
@Data
@ToString
@NoArgsConstructor
public class Post implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private boolean published;
    private String content;
    @OneToMany(mappedBy = "post")
    @JsonIgnore
    private Set<PostComment> postComments = new LinkedHashSet<>();
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parentId")
    private Post parent;
    private String metaTitle;
    private String summary;
    private Instant createdAt;
    @OneToMany(mappedBy = "parent")
    @JsonIgnore
    private Set<Post> posts = new LinkedHashSet<>();
    private String title;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "authorId")
    private User author;
    private Instant updatedAt;
    private Instant publishedAt;

    public Post( boolean published, String content, Post parent, String metaTitle, String summary, Instant createdAt, String title, User author, Instant updatedAt, Instant publishedAt) {
        this.published = published;
        this.content = content;
        this.parent = parent;
        this.metaTitle = metaTitle;
        this.summary = summary;
        this.createdAt = createdAt;
        this.title = title;
        this.author = author;
        this.updatedAt = updatedAt;
        this.publishedAt = publishedAt;
    }
}
