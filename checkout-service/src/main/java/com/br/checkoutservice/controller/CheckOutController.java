package com.br.checkoutservice.controller;

import com.br.checkoutservice.exception.CheckInException;
import com.br.checkoutservice.model.CheckOut;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public interface CheckOutController {

    @PostMapping(value = "/")
    public ResponseEntity<CheckOut> checkOut (@RequestBody CheckOut checkOut) throws CheckInException;

}
