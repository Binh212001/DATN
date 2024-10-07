package org.example.yodybe.service;

import org.example.yodybe.dto.CartDto;
import org.example.yodybe.entity.Cart;
import org.example.yodybe.entity.Product;
import org.example.yodybe.entity.User;
import org.example.yodybe.form.CartForm;
import org.example.yodybe.repositoties.CartRepository;
import org.example.yodybe.repositoties.ProductRepository;
import org.example.yodybe.repositoties.UserRepository;
import org.example.yodybe.utils.BaseResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    CartRepository cartRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ProductRepository productRepository;

    @Override
    public BaseResponse getCartById(Long id) {
        try {
            Optional<User> user = userRepository.findById(id);
            if (user.isEmpty()) {
                return new BaseResponse("User not found", null, 404);
            }
            List<Cart> carts = cartRepository.findByUser(user.get());
            List<CartDto> cartDtos = carts.stream().map(c -> mapToDto(c)).collect(Collectors.toList());
            return new BaseResponse("ok", cartDtos, 200);
        } catch (Exception e) {
            return new BaseResponse(e.getMessage(), null, 500);
        }
    }

    @Override
    public BaseResponse saveCart(CartForm cartForm) {
        try {
            User user = userRepository.findById(cartForm.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
            Product product = productRepository.findById(cartForm.getProductId()).orElseThrow(() -> new RuntimeException("Product not found"));
            Cart cart = new Cart();
            cart.setUser(user);
            cart.setTotalPrice(cartForm.getTotalPrice());
            cart.setProduct(product);
            cart.setQuantity(cartForm.getQuantity());
            cartRepository.save(cart);
            return new BaseResponse("ok", cart, 201);
        } catch (Exception e) {
            return new BaseResponse(e.getMessage(), null, 500);
        }
    }

    @Override
    public BaseResponse updateCart(Long id, CartForm cartDetails) {
        try {

            Optional<Cart> cart = cartRepository.findById(id);
            if (cart.isEmpty()) {
                return new BaseResponse("Cart not found", null, 404);
            }
            cart.get().setTotalPrice(cartDetails.getTotalPrice());
            cart.get().setQuantity(cartDetails.getQuantity());
            cartRepository.save(cart.get());
            return new BaseResponse("ok", cart, 201);
        } catch (Exception e) {
            return new BaseResponse(e.getMessage(), null, 500);
        }

    }
    public CartDto mapToDto(Cart cart) {
        CartDto cartDto = new CartDto();
        cartDto.setId(cart.getId());
        cartDto.setUser(cart.getUser());
        cartDto.setTotalPrice(cart.getTotalPrice());
        cartDto.setProduct(cart.getProduct());
        cartDto.setQuantity(cart.getQuantity());
        cartDto.setStatus(cart.getStatus());
        return cartDto;
    }
}
