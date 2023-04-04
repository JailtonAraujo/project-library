package com.br.checkinproducer.service;

import com.br.checkinproducer.DTO.CheckInDTO;
import com.br.checkinproducer.exception.PendingCheckIngException;
import com.br.checkinproducer.model.CheckIn;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.util.List;

public interface CheckInService {

     Boolean checkBookIsAvailable(Long bookId);

     Boolean checkIfCustomerExists(Long customerId);

     void changeBookQuantity(int quantity, Long bookId);

    Boolean checkState (CheckIn checkIn) throws PendingCheckIngException;

    public CheckIn createCheckIn(CheckIn order) throws PendingCheckIngException;

    public Page<CheckInDTO> getAllCheckIn(Integer offset);

    public Page<CheckInDTO> getAllByUserName(Integer offset,String name);

    public Page<CheckInDTO> getAllByDateInterval(Integer offset,LocalDate initialDate, LocalDate finalDate);

}
