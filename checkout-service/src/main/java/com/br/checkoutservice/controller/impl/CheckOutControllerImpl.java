package com.br.checkoutservice.controller.impl;

import com.br.checkoutservice.controller.CheckOutController;
import com.br.checkoutservice.exception.CheckInException;
import com.br.checkoutservice.model.CheckOut;
import com.br.checkoutservice.service.CheckOutService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
