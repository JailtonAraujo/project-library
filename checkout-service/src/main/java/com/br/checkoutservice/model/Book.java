package com.br.checkoutservice.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.time.LocalDate;

@Data
@Entity(name = "tbl_checkout")
public class Book implements Serializable {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    private Book book;
//
//    private Customer customer;

    private Float valorPago;

    private Float taxaAtraso;

    private LocalDate dateCheckOut;

    private int daysAtraso;

}
