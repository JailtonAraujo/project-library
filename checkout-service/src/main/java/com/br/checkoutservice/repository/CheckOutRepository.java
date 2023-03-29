package com.br.checkoutservice.repository;

import com.br.checkoutservice.model.CheckOut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface CheckOutRepository extends JpaRepository<CheckOut, Long> {

    @Query(value = "SELECT tbl_checkin.state FROM tbl_checkin WHERE id = ?1 and customer_id = ?2 and book_id = ?3"
            ,nativeQuery = true)
    public Optional<String> getState (Long checkInId, Long customerId, Long bookId);



}
