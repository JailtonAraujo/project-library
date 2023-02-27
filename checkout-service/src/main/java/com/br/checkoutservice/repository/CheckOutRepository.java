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

    @Query(value = "SELECT tbl_checkin.state FROM tbl_checkin WHERE id = ?1",nativeQuery = true)
    public Optional<String> getState (Long checkInId);

    @Query(value = "SELECT tbl_checkin.checkin_date FROM tbl_checkin WHERE id = ?1",nativeQuery = true)
    public LocalDate getDateCheckIn (Long checkInId);

    @Modifying
    @Query(value = "UPDATE tbl_checkin set state=?2 WHERE id = ?1",nativeQuery = true)
    public void changeStateCheck (Long checkInId, String state);

}
