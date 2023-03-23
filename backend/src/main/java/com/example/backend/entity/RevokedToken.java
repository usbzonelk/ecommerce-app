package com.example.backend.entity;

import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "revoke_token")
public class RevokedToken {
    @Id
    @Column(name = "revoke_id", length = 40 )
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long revokeID;

    @Column(name = "token" , nullable = false , unique = true , length = 10000)
    private String token ;

}
