package com.br.checkinproducer.DTO;

import com.br.checkinproducer.model.Book;
import com.br.checkinproducer.model.Customer;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CheckInDTO {

    private Long id;

    private Book book;

    private Customer customer;

    private LocalDate checkin_date;

    private LocalDate checkout_date;

    private int daysLate;

    private float taxa;

    private String state;

    private Float valor;

}
