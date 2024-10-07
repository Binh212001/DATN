package org.example.yodybe.service;

import org.example.yodybe.form.CartForm;
import org.example.yodybe.utils.BaseResponse;

import java.util.List;

public interface CartService {
    BaseResponse getCartById(Long id);

    BaseResponse saveCart(CartForm cartForm);

    BaseResponse updateCart(Long id, CartForm cartDetails);

}
