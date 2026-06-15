const orders = [
  {
    id: 'ORD-8923',
    customer: 'Sarah Jenkins',
    date: '2024-03-14T09:30:00Z',
    total: 10400.00,
    status: 'Processing',
    paymentStatus: 'Upcoming', // Cash on Delivery or Net Terms
    items: 3
  },
  {
    id: 'ORD-8922',
    customer: 'Michael Chen',
    date: '2024-03-13T15:45:00Z',
    total: 2800.00,
    status: 'Shipped',
    paymentStatus: 'Outstanding', // Failed capture but shipped, or check pending
    items: 1
  },
  {
    id: 'ORD-8921',
    customer: 'Emma Watson',
    date: '2024-03-12T11:20:00Z',
    total: 22720.00,
    status: 'Delivered',
    paymentStatus: 'Paid',
    items: 2
  },
  {
    id: 'ORD-8920',
    customer: 'David Miller',
    date: '2024-03-10T14:15:00Z',
    total: 5200.00,
    status: 'Delivered',
    paymentStatus: 'Paid',
    items: 1
  },
  {
    id: 'ORD-8919',
    customer: 'Jessica Taylor',
    date: '2024-03-08T10:05:00Z',
    total: 13600.00,
    status: 'Cancelled', // Or Returned
    paymentStatus: 'RTO', // Return to Origin
    items: 2
  }
];

export default orders;
