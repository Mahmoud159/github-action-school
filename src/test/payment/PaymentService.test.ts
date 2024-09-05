import { PaymentDetails, PaymentMethod } from '../../app/payment/PaymentDetails';
import { PaymentService } from '../../app/payment/PaymentService';

describe('Payment Service', () => {
  const paymentAdapterMock = {
    processPayment: jest.fn(),
  };
  let paymentService: PaymentService;

  beforeEach(() => {
    paymentService = new PaymentService(paymentAdapterMock);
  });

  test('should successfully process a valid payment', () => {
    // Arrange
    //TODO: Create paymentDetails object initialized with fake data
    //TODO: Create mockProcessPaymentResponse object containing success status and a fake transactiondId
    //TODO: Mock processPayment implementation
    const mockPaymentDetails: PaymentDetails = { amount: 50, currency: 'TND', method : PaymentMethod.CreditCard , cardNumber : '123'};
    const mockProcessPaymentResponse = {
        status: 'success',
        transactionId: 'txn_1234567890',
      };
  
    paymentAdapterMock.processPayment.mockImplementation(() => mockProcessPaymentResponse);
  
      // Act
    const result = paymentService.makePayment(mockPaymentDetails);
    // Assert
    // Check the returned result is equal to the success message returned by makePayment with thefake  transactionId you have defined in mockProcessPaymentResponse
    // Check that processPayment inside makePayment has been called with paymentDetails
    expect(result).toBe('Payment successful. Transaction ID: txn_1234567890');
    expect(paymentAdapterMock.processPayment).toHaveBeenCalledWith(mockPaymentDetails);
  });

  test('should throw an error for payment failure', () => {
    // Arrange
    //TODO: Create paymentDetails object initialized with fake data
    //TODO: Create mockProcessPaymentResponse object containing failure status
    //TODO: Mock processPayment implementation
    const mockPaymentDetails: PaymentDetails = {
      amount: 50,
      currency: 'TND',
      method: PaymentMethod.PayPal,
      cardNumber: '1234567890123456',
    };

    const mockProcessPaymentResponse = {
      status: 'failure',
    };

    paymentAdapterMock.processPayment.mockImplementation(() => mockProcessPaymentResponse);

    // Act & Assert
    expect(() => paymentService.makePayment(mockPaymentDetails)).toThrow('Payment failed');
  });

  test('should throw an error for invalid payment amount', () => {
    // Arrange
    //TODO: Create paymentDetails object initialized with fake data where amount should be negative or undefined
    const invalidPaymentDetails1: PaymentDetails = {
      amount: -10,
      currency: 'TND',
      method: PaymentMethod.CreditCard,
      cardNumber: '1234567890123456',
    };

    const invalidPaymentDetails2: PaymentDetails = {
      amount: undefined,
      currency: 'TND',
      method: PaymentMethod.CreditCard,
      cardNumber: '1234567890123456',
    };
    // Act & Assert
    expect(() => paymentService.makePayment(invalidPaymentDetails1)).toThrow('Invalid payment amount');
    expect(() => paymentService.makePayment(invalidPaymentDetails2)).toThrow('Invalid payment amount');
  });
});
