package com.br.checkinproducer.controller.impl;

import com.br.checkinproducer.DTO.CheckInDTO;
import com.br.checkinproducer.controller.CheckInController;
import com.br.checkinproducer.exception.PendingCheckIngException;
import com.br.checkinproducer.model.CheckIn;
import com.br.checkinproducer.service.CheckInService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/checkin")
@CrossOrigin(originPatterns = {"*"})
public class CheckControllerImpl implements CheckInController {

    private final CheckInService checkInService;

    @Override
    public ResponseEntity<CheckIn> checkIn(CheckIn checkIn) throws PendingCheckIngException {;

        return ResponseEntity.status(HttpStatus.CREATED).body(checkInService.createCheckIn(checkIn));
    }

    @Override
    public ResponseEntity<Page<CheckInDTO>> getAll(Integer offset) {

        return ResponseEntity.ok(checkInService.getAllCheckIn(offset));

    }

    @Override
    public ResponseEntity<Page<CheckInDTO>> getAllByCustomerName(String name,Integer offset) {
        return ResponseEntity.ok(checkInService.getAllByUserName(offset,name));
    }

    @Override
    public ResponseEntity<Page<CheckInDTO>> getAllByDateInterval(String initialDate, String finalDate,Integer offset) {

        LocalDate initial = LocalDate.parse(initialDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        LocalDate finalD = LocalDate.parse(finalDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        return ResponseEntity.ok(checkInService.getAllByDateInterval(offset,initial,finalD));
    }
}
