package com.br.checkinproducer.controller;

import com.br.checkinproducer.dto.OrderDTO;
import com.br.checkinproducer.model.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


public interface CheckInController {

    @PostMapping("/")
    public ResponseEntity<OrderDTO> checkIn (@RequestBody Order order);

}
