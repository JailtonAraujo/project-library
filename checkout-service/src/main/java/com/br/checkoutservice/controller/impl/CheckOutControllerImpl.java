package com.br.checkoutservice.controller.impl;

import com.br.checkoutservice.controller.CheckOutController;
import com.br.checkoutservice.exception.CheckInException;
import com.br.checkoutservice.model.CheckOut;
import com.br.checkoutservice.service.CheckOutService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RequiredArgsConstructor
@RestController
@RequestMapping("/checkout")
public class CheckOutControllerImpl implements CheckOutController {

    private final CheckOutService checkOutService;

    @Override
    public ResponseEntity<CheckOut> checkOut(CheckOut checkOut) throws CheckInException {

        checkOutService.createCheckOut(checkOut);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Override
    public ResponseEntity<Page<CheckOut>> findAll(int offset, int limit) throws Exception {
        return ResponseEntity.ok(checkOutService.findAll(offset,10));
    }

    @Override
    public ResponseEntity<Page<CheckOut>> findByCustomer(int offset, int limit, String name) throws Exception {
        return ResponseEntity.ok(checkOutService.findByCustomer(offset,limit,name));
    }

    @Override
    public ResponseEntity<Page<CheckOut>> findByDateInterval(int offset, int limit, String initialDate, String finalDate) throws Exception {

        LocalDate initDate = LocalDate.parse(initialDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        LocalDate fimDate = LocalDate.parse(finalDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        return ResponseEntity.ok(checkOutService.findBy(offset,limit,initDate,fimDate));
    }
}
