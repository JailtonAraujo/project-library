package com.br.checkinproducer.repository;

import com.br.checkinproducer.model.CheckIn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CheckInRepository extends JpaRepository<CheckIn, Long> {

    @Query(value = "select checkin.state from tbl_checkin checkin where checkin.book_id = ?1 and checkin.customer_id = ?2")
    public Optional<String> getState (Long bookId,Long customer_id);

}
