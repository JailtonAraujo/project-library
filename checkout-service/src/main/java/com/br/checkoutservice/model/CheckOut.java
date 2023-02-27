package com.br.checkoutservice.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Data
@Entity(name = "tbl_checkout")
public class CheckOut implements Serializable {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @OneToOne(optional = false, cascade = CascadeType.MERGE)
    @JoinColumn(name = "book_id")
    private Book book;
//
//    @OneToOne(optional = false,cascade = CascadeType.MERGE)
//    @JoinColumn(name = "customer_id")
//    private Customer customer;

    @Column(name = "checkin_id")
    private Long CheckInId;

    @Column(name = "valor_pago")
    private Float valorPago;

    @Column(name = "taxa_atraso")
    private Float taxaAtraso;

    @Column(name = "checkout_date")
    private LocalDate dateCheckOut;

    @Column(name = "dias_atraso")
    private int diasAtraso;

}
