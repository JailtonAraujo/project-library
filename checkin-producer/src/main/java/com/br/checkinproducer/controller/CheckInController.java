package com.br.checkinproducer.controller;

import com.br.checkinproducer.exception.PendingCheckIngException;
import com.br.checkinproducer.model.CheckIn;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


public interface CheckInController {

    @PostMapping("/")
    public ResponseEntity<CheckIn> checkIn (@RequestBody CheckIn order) throws PendingCheckIngException;

    @GetMapping("/")
    public ResponseEntity<Page<CheckIn>> getAll ( @RequestParam( name = "offset", defaultValue = "0") Integer offset );

    @GetMapping("/customer/")
    public  ResponseEntity<Page<CheckIn>> getAllByCustomerName (
            @RequestParam(name = "name",defaultValue = "") String name,
            @RequestParam(name = "offset", defaultValue = "0") Integer offset
    );

    @GetMapping("/date/")
    public  ResponseEntity<Page<CheckIn>> getAllByDateInterval
            (@RequestParam(name = "initial")String initialDate,
             @RequestParam(name = "final")String finalDate,
             @RequestParam(name = "offset", defaultValue = "0") Integer offset);

}
