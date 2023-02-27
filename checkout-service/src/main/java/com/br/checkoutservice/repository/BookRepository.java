package com.br.checkoutservice.repository;

import com.br.checkoutservice.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    @Query(value="UPDATE tbl_book SET quantity = ?1 WHERE tbl_book.id = ?2",nativeQuery = true)
    public void changeQuantity(int quantity, Long bookId);

    @Query(value = "SELECT b.quantity FROM tbl_book b WHERE b.id = ?1 ")
    public int getQuantity (Long bookId);

}
