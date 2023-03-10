package com.br.checkinproducer.controller.impl;

import com.br.checkinproducer.controller.CheckInController;
import com.br.checkinproducer.exception.PendingCheckIngException;
import com.br.checkinproducer.model.CheckIn;
import com.br.checkinproducer.service.CheckInService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/checkin")
public class CheckControllerImpl implements CheckInController {

    private final CheckInService checkInService;

    @Override
    public ResponseEntity<CheckIn> checkIn(CheckIn checkIn) throws PendingCheckIngException {

        checkInService.createCheckIn(checkIn);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
