package org.example.yodybe.utils;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaginationResponse extends BaseResponse {
    private int currentPage;
    private int totalPages;
    private long totalElements;
    public PaginationResponse(String message, Object data, int status, int currentPage, int totalPages, long totalElements) {
        super(message, data, status);
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
    }
}
