package com.br.checkoutservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Date;

@RestController
@ControllerAdvice
public class handleException extends ResponseEntityExceptionHandler {

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<ExceptionResponse> handlerAllExceptions(Exception ex, WebRequest webRequest){

        ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(),ex.getMessage(),webRequest.getDescription(false),500);

        return new ResponseEntity<ExceptionResponse>(exceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(CheckInException.class)
    public final ResponseEntity<ExceptionResponse> CheckInException(Exception ex, WebRequest webRequest){

        ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(),ex.getMessage(),webRequest.getDescription(false),422);

        return new ResponseEntity<ExceptionResponse>(exceptionResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }


}
