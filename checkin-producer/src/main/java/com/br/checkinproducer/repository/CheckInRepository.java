package com.br.checkinproducer.repository;

import com.br.checkinproducer.model.CheckIn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface CheckInRepository extends JpaRepository<CheckIn, Long> {

    @Query(value = "select checkin.state from tbl_checkin checkin where checkin.book.id = ?1 and checkin.customer.id = ?2")
    public Optional<String> getState (Long bookId,Long customer_id);



    @Query("SELECT check FROM tbl_checkin check WHERE check.checkin_date BETWEEN (?1) AND (?2) AND (check.state = 'PENDING' or check.state = 'LATE') ")
    public List<CheckIn> getAllByDateInterval (LocalDate initialDate, LocalDate finalDate);


    @Query(value = "SELECT COUNT(1) FROM tbl_checkin check WHERE check.checkin_date BETWEEN (?1) AND (?2) AND (check.state = 'PENDING' or check.state = 'LATE')")
    public Integer countByDateInterval(LocalDate initialDate, LocalDate finalDate);

}
