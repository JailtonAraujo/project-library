package com.br.checkinproducer;

import com.br.checkinproducer.model.CheckIn;
import com.br.checkinproducer.repository.CheckInRepository;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class CheckinProducerApplicationTests {

	@Autowired
	private CheckInRepository checkInRepository;

	@Test
	void getAllByUserNameTest (){

		List<CheckIn> list = checkInRepository.getAllByUserName("jaiton");

		System.out.println(list);

	}


}
