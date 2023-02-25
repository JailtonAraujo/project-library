package com.br.checkinproducer.repository;

import com.br.checkinproducer.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    @Query("SELECT CASE WHEN count(1) > 0 THEN TRUE ELSE FALSE END FROM tbl_customer c WHERE c.id = ?1")
    public boolean customerExists(Long customerId);

}
