package com.br.checkinproducer.controller;

import com.br.checkinproducer.exception.PendingCheckIngException;
import com.br.checkinproducer.model.CheckIn;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


public interface CheckInController {

    @PostMapping("/")
    public ResponseEntity<CheckIn> checkIn (@RequestBody CheckIn order) throws PendingCheckIngException;

    @GetMapping("/")
    public ResponseEntity<List<CheckIn>> getAll ();

    @GetMapping("/customer/{name}")
    public  ResponseEntity<List<CheckIn>> getAllByCustomerName (@PathVariable(name = "name") String name);

    @GetMapping("/date/interval")
    public  ResponseEntity<List<CheckIn>> getAllByDateInterval
            (@RequestParam(name = "initialDate")LocalDate initialDate, @RequestParam(name = "finalDate")LocalDate finalDate);

}
