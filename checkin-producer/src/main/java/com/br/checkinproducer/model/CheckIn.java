package com.br.checkinproducer.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Data
@Entity(name = "tbl_checkin")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CheckIn implements Serializable {

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

    private LocalDate checkin_date;

    private LocalDate checkout_date;

    private String state;

    private Float valor;

}
