package com.sportshop.service;

import com.sportshop.dto.Purchase;
import com.sportshop.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
