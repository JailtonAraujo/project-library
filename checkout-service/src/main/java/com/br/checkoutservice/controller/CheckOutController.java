package com.br.checkoutservice.controller;

import com.br.checkoutservice.exception.CheckInException;
import com.br.checkoutservice.model.CheckOut;
import org.hibernate.annotations.Check;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;

public interface CheckOutController {

    @PostMapping(value = "/")
    public ResponseEntity<CheckOut> checkOut (@RequestBody CheckOut checkOut) throws CheckInException;

    @GetMapping(value = "/")
    public ResponseEntity<Page<CheckOut>> findAll(
            @RequestParam(name = "offset", defaultValue = "0") int offset,
            @RequestParam(name = "limit", defaultValue = "10") int limit
    ) throws Exception;

    @GetMapping(value = "/customer/")
    public ResponseEntity<Page<CheckOut>> findByCustomer(
            @RequestParam(name = "offset", defaultValue = "0") int offset,
            @RequestParam(name = "limit", defaultValue = "10") int limit,
            @RequestParam(name = "name") String name
    ) throws Exception;

    @GetMapping(value = "/date/")
    public ResponseEntity<Page<CheckOut>> findByDateInterval(
            @RequestParam(name = "offset", defaultValue = "0") int offset,
            @RequestParam(name = "limit", defaultValue = "10") int limit,
            @RequestParam(name = "initial", defaultValue = "2023-01-01" ) String initialDate,
            @RequestParam(name = "final", defaultValue = "2023-01-01") String finalDate
    ) throws Exception;

}
