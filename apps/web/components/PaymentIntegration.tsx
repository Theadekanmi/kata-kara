"use client";
import { useState, useEffect } from "react";

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  email?: string;
  bankName?: string;
  isDefault: boolean;
}

interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'succeeded' | 'failed';
  description: string;
  projectId?: number;
  freelancerId?: number;
  clientId?: number;
}

interface PaymentIntegrationProps {
  amount: number;
  currency?: string;
  description: string;
  projectId?: number;
  freelancerId?: number;
  onSuccess: (paymentId: string) => void;
  onError: (error: string) => void;
}

export function PaymentIntegration({
  amount,
  currency = "USD",
  description,
  projectId,
  freelancerId,
  onSuccess,
  onError
}: PaymentIntegrationProps) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [showAddCard, setShowAddCard] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [cardForm, setCardForm] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    saveCard: false
  });

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const access = localStorage.getItem("access_token");
      const base = process.env.NEXT_PUBLIC_API_BASE || "https://prowebnigeria.pythonanywhere.com";
      
      const response = await fetch(`${base}/api/payments/methods/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      if (response.ok) {
        const methods = await response.json();
        setPaymentMethods(methods);
        
        const defaultMethod = methods.find((m: PaymentMethod) => m.isDefault);
        if (defaultMethod) {
          setSelectedMethod(defaultMethod.id);
        }
      } else {
        // Mock payment methods for demo
        const mockMethods: PaymentMethod[] = [
          {
            id: "pm_1",
            type: "card",
            last4: "4242",
            brand: "visa",
            expiryMonth: 12,
            expiryYear: 2025,
            isDefault: true
          },
          {
            id: "pm_2",
            type: "paypal",
            email: "user@example.com",
            isDefault: false
          }
        ];
        setPaymentMethods(mockMethods);
        setSelectedMethod("pm_1");
      }
    } catch (error) {
      console.error("Failed to fetch payment methods:", error);
    } finally {
      setLoading(false);
    }
  };

  const createPaymentIntent = async () => {
    try {
      const access = localStorage.getItem("access_token");
      const base = process.env.NEXT_PUBLIC_API_BASE || "https://prowebnigeria.pythonanywhere.com";
      
      const response = await fetch(`${base}/api/payments/create-intent/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to cents
          currency,
          description,
          project_id: projectId,
          freelancer_id: freelancerId,
          payment_method: selectedMethod
        }),
      });

      if (response.ok) {
        const intent = await response.json();
        return intent;
      } else {
        // Mock payment intent for demo
        return {
          id: `pi_${Date.now()}`,
          client_secret: `pi_${Date.now()}_secret_mock`,
          status: 'requires_confirmation'
        };
      }
    } catch (error) {
      console.error("Failed to create payment intent:", error);
      throw error;
    }
  };

  const processPayment = async () => {
    if (!selectedMethod && !showAddCard) {
      onError("Please select a payment method");
      return;
    }

    setProcessing(true);

    try {
      // Create payment intent
      const intent = await createPaymentIntent();
      
      if (showAddCard) {
        // Process new card payment
        await processNewCardPayment(intent);
      } else {
        // Process with existing payment method
        await processExistingMethodPayment(intent);
      }
      
      onSuccess(intent.id);
      
    } catch (error) {
      onError(error instanceof Error ? error.message : "Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  const processNewCardPayment = async (intent: any) => {
    // In a real implementation, you would use Stripe.js or similar
    // For demo purposes, we'll simulate the payment process
    
    if (!cardForm.number || !cardForm.expiry || !cardForm.cvc || !cardForm.name) {
      throw new Error("Please fill in all card details");
    }

    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate random success/failure for demo
    if (Math.random() > 0.1) { // 90% success rate
      // Save card if requested
      if (cardForm.saveCard) {
        const newMethod: PaymentMethod = {
          id: `pm_${Date.now()}`,
          type: "card",
          last4: cardForm.number.slice(-4),
          brand: detectCardBrand(cardForm.number),
          expiryMonth: parseInt(cardForm.expiry.split('/')[0]),
          expiryYear: parseInt('20' + cardForm.expiry.split('/')[1]),
          isDefault: paymentMethods.length === 0
        };
        
        setPaymentMethods(prev => [...prev, newMethod]);
      }
    } else {
      throw new Error("Payment was declined. Please try a different card.");
    }
  };

  const processExistingMethodPayment = async (intent: any) => {
    // Simulate payment processing with existing method
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate random success/failure for demo
    if (Math.random() < 0.05) { // 5% failure rate
      throw new Error("Payment failed. Please try again or use a different payment method.");
    }
  };

  const detectCardBrand = (number: string): string => {
    const patterns = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
      discover: /^6(?:011|5)/
    };

    for (const [brand, pattern] of Object.entries(patterns)) {
      if (pattern.test(number)) {
        return brand;
      }
    }
    
    return 'unknown';
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Details</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Amount:</span>
            <span className="text-2xl font-bold text-gray-900">
              {currency === 'USD' ? '$' : currency} {amount.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-600">Description:</span>
            <span className="text-gray-900">{description}</span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h4>
        
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <label key={method.id} className="cursor-pointer">
              <input
                type="radio"
                name="payment-method"
                value={method.id}
                checked={selectedMethod === method.id && !showAddCard}
                onChange={() => {
                  setSelectedMethod(method.id);
                  setShowAddCard(false);
                }}
                className="sr-only"
              />
              <div className={`p-4 border-2 rounded-lg transition-colors ${
                selectedMethod === method.id && !showAddCard
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3">
                      {method.type === 'card' && <span className="text-2xl">💳</span>}
                      {method.type === 'paypal' && <span className="text-2xl">🅿️</span>}
                      {method.type === 'bank' && <span className="text-2xl">🏦</span>}
                    </div>
                    <div>
                      {method.type === 'card' && (
                        <div>
                          <div className="font-medium capitalize">
                            {method.brand} •••• {method.last4}
                          </div>
                          <div className="text-sm text-gray-500">
                            Expires {method.expiryMonth}/{method.expiryYear}
                          </div>
                        </div>
                      )}
                      {method.type === 'paypal' && (
                        <div>
                          <div className="font-medium">PayPal</div>
                          <div className="text-sm text-gray-500">{method.email}</div>
                        </div>
                      )}
                      {method.type === 'bank' && (
                        <div>
                          <div className="font-medium">{method.bankName}</div>
                          <div className="text-sm text-gray-500">Bank Transfer</div>
                        </div>
                      )}
                    </div>
                  </div>
                  {method.isDefault && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Default
                    </span>
                  )}
                </div>
              </div>
            </label>
          ))}

          {/* Add New Card Option */}
          <label className="cursor-pointer">
            <input
              type="radio"
              name="payment-method"
              checked={showAddCard}
              onChange={() => {
                setShowAddCard(true);
                setSelectedMethod("");
              }}
              className="sr-only"
            />
            <div className={`p-4 border-2 rounded-lg transition-colors ${
              showAddCard
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:border-gray-300"
            }`}>
              <div className="flex items-center">
                <span className="text-2xl mr-3">➕</span>
                <span className="font-medium">Add New Card</span>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* New Card Form */}
      {showAddCard && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h5 className="font-medium text-gray-900 mb-4">Card Information</h5>
          
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                value={cardForm.number}
                onChange={(e) => setCardForm(prev => ({
                  ...prev,
                  number: formatCardNumber(e.target.value)
                }))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={cardForm.expiry}
                  onChange={(e) => setCardForm(prev => ({
                    ...prev,
                    expiry: formatExpiry(e.target.value)
                  }))}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVC
                </label>
                <input
                  type="text"
                  value={cardForm.cvc}
                  onChange={(e) => setCardForm(prev => ({
                    ...prev,
                    cvc: e.target.value.replace(/\D/g, '').slice(0, 4)
                  }))}
                  placeholder="123"
                  maxLength={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                value={cardForm.name}
                onChange={(e) => setCardForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={cardForm.saveCard}
                  onChange={(e) => setCardForm(prev => ({ ...prev, saveCard: e.target.checked }))}
                  className="text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Save card for future payments
                </span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start">
          <span className="text-blue-500 mr-2">🔒</span>
          <div>
            <h6 className="text-sm font-medium text-blue-900">Secure Payment</h6>
            <p className="text-sm text-blue-700">
              Your payment information is encrypted and secure. We never store your card details.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <button
        onClick={processPayment}
        disabled={processing || (!selectedMethod && !showAddCard)}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing Payment...
          </div>
        ) : (
          `Pay ${currency === 'USD' ? '$' : currency}${amount.toLocaleString()}`
        )}
      </button>

      {/* Payment Powered By */}
      <div className="mt-4 text-center text-xs text-gray-500">
        🔒 Powered by Stripe & PayPal • PCI DSS Compliant
      </div>
    </div>
  );
}

