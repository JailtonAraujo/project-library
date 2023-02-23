package com.br.checkinproducer.model;


import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity(name = "tbl_order")
public class Order implements Serializable {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false, cascade = CascadeType.MERGE)
    @JoinColumn(name = "book_id")
    @org.hibernate.annotations.ForeignKey(name = "FK_Order_Book")
    private Book book;

    @OneToOne(optional = false,cascade = CascadeType.MERGE)
    @JoinColumn(name = "customer_id")
    @org.hibernate.annotations.ForeignKey(name = "FK_Order_Customer")
    private Customer customer;

}
