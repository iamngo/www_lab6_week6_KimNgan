package vn.edu.iuh.fit.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.edu.iuh.fit.models.Post;
import vn.edu.iuh.fit.models.PostComment;

import java.io.Serializable;
import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String mobile;
    @Column(name = "last_login")
    private Instant lastLogin;
    @Column(name = "last_name")
    private String lastName;
    private String intro;
    private String profile;
    @Column(name = "registered_at")
    private Instant registeredAt;
    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private Set<PostComment> comments = new LinkedHashSet<>();
    @Column(name = "password_hash")
    private String passwordHash;
    @Column(name = "middle_name")
    private String middleName;
    @OneToMany(mappedBy = "author")
    @JsonIgnore
    private Set<Post> posts = new LinkedHashSet<>();
    @Column(name = "first_name")
    private String firstName;
    private String email;

    public User( String mobile, Instant lastLogin, String lastName, String intro, String profile, Instant registeredAt, String passwordHash, String middleName, String firstName, String email) {
        this.mobile = mobile;
        this.lastLogin = lastLogin;
        this.lastName = lastName;
        this.intro = intro;
        this.profile = profile;
        this.registeredAt = registeredAt;
        this.passwordHash = passwordHash;
        this.middleName = middleName;
        this.firstName = firstName;
        this.email = email;
    }
}
