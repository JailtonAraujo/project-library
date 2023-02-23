package com.br.checkinproducer.dto;

import com.br.checkinproducer.model.Book;
import com.br.checkinproducer.model.Customer;
import lombok.Data;

@Data
public class OrderDTO {

    private Long id;

    private Book book;

    private Customer customer;
}
