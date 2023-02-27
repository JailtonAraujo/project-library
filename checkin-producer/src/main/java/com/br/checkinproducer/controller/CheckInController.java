package com.br.checkinproducer.controller;

import com.br.checkinproducer.exception.PendingCheckIngException;
import com.br.checkinproducer.model.CheckIn;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


public interface CheckInController {

    @PostMapping("/")
    public ResponseEntity<CheckIn> checkIn (@RequestBody CheckIn order) throws PendingCheckIngException;

}
