export const MOCK_EMPLOYEES = [
  {
    id: 'emp-101',
    name: 'Amit Patel',
    email: 'amit.p@siddhivinayaktours.com',
    phone: '9820199887',
    role: 'Sales Manager',
    assignedLeadsCount: 28,
    conversionRate: '72%',
    totalRevenueGenerated: 850000,
    status: 'Active'
  },
  {
    id: 'emp-102',
    name: 'Neha Joshi',
    email: 'neha.j@siddhivinayaktours.com',
    phone: '9820211223',
    role: 'Travel Consultant',
    assignedLeadsCount: 34,
    conversionRate: '68%',
    totalRevenueGenerated: 620000,
    status: 'Active'
  },
  {
    id: 'emp-103',
    name: 'Suresh Kumar',
    email: 'suresh.k@siddhivinayaktours.com',
    phone: '9820333445',
    role: 'Operations Manager',
    assignedLeadsCount: 15,
    conversionRate: '85%',
    totalRevenueGenerated: 940000,
    status: 'Active'
  },
  {
    id: 'emp-104',
    name: 'Kavita Roy',
    email: 'kavita.r@siddhivinayaktours.com',
    phone: '9820444556',
    role: 'Accountant',
    assignedLeadsCount: 0,
    conversionRate: 'N/A',
    totalRevenueGenerated: 0,
    status: 'Active'
  }
];

export const MOCK_VENDORS = [
  {
    id: 'vnd-1',
    companyName: 'The Machan Hospitality Pvt Ltd',
    contactPerson: 'Varun Kapoor',
    phone: '02114-273000',
    email: 'partners@themachan.com',
    category: 'Hotel Partner',
    location: 'Lonavala',
    services: 'Treehouse Suites & Eco Lodges',
    pricing: '₹8,500 - ₹18,000 / night',
    contractStatus: 'Active Contract (15% Commission)',
    rating: 4.9
  },
  {
    id: 'vnd-2',
    companyName: 'Sahyadri Roadways & Luxury Cabs',
    contactPerson: 'Ganesh Shinde',
    phone: '9822012345',
    email: 'dispatch@sahyadri.com',
    category: 'Transport Provider',
    location: 'Mumbai & Pune',
    services: 'Innova Crysta & Volvo Bus Fleet',
    pricing: '₹14/km + Tolls',
    contractStatus: 'Active Contract (12% Commission)',
    rating: 4.8
  },
  {
    id: 'vnd-3',
    companyName: 'Mapro Garden & Food Products',
    contactPerson: 'Rohan Mapro',
    phone: '02168-260111',
    email: 'tours@mapro.com',
    category: 'Restaurant & Activity',
    location: 'Mahabaleshwar',
    services: 'Strawberry Farm Tours & Dining',
    pricing: '₹600 / person',
    contractStatus: 'Partnered (10% Discount Code)',
    rating: 4.95
  }
];

export const MOCK_DRIVERS = [
  {
    id: 'drv-1',
    name: 'Santosh Pawar',
    phone: '9823055667',
    licenseNo: 'MH-14-2018-0098234',
    vehicleNo: 'MH 14 GE 4492',
    vehicleType: 'Mahindra Thar 4x4 (Hard Top)',
    rating: 4.9,
    assignedTrip: 'Mumbai to Lonavala Weekend Package',
    status: 'On Duty (En Route)'
  },
  {
    id: 'drv-2',
    name: 'Rajesh Kadam',
    phone: '9823077889',
    licenseNo: 'MH-12-2016-0043211',
    vehicleNo: 'MH 12 FX 8810',
    vehicleType: 'Toyota Innova Crysta ZX',
    rating: 4.95,
    assignedTrip: 'Goa 4D/3N Family Tour',
    status: 'Assigned for Aug 15'
  },
  {
    id: 'drv-3',
    name: 'Vijay Shinde',
    phone: '9823099001',
    licenseNo: 'MH-04-2020-0012904',
    vehicleNo: 'MH 04 ER 2234',
    vehicleType: 'BMW 5 Series Sedan',
    rating: 4.85,
    assignedTrip: 'VIP Airport Transfer',
    status: 'Available'
  }
];

export const MOCK_GUIDES = [
  {
    id: 'gd-1',
    name: 'Anand Deshmukh',
    languages: 'Marathi, Hindi, English, Gujarati',
    expertise: 'Karla Caves & Maratha Fort History',
    location: 'Lonavala & Pune',
    rating: 4.9,
    availability: 'Available Aug 15-20',
    assignedTour: 'Rajmachi & Karla Heritage Walk'
  },
  {
    id: 'gd-2',
    name: 'Maria D’Souza',
    languages: 'English, Konkani, Hindi, Portuguese',
    expertise: 'Old Goa Churches & Latin Quarter Heritage',
    location: 'North & South Goa',
    rating: 4.95,
    availability: 'Available',
    assignedTour: 'Fontainhas Latin Quarter Walking Tour'
  }
];

export const MOCK_INVENTORY = [
  { item: 'The Machan Treehouses (Lonavala)', category: 'Hotel Room', total: 20, booked: 16, available: 4, status: 'High Demand' },
  { item: 'Toyota Innova Crysta Cabs', category: 'Vehicle', total: 15, booked: 12, available: 3, status: 'Available' },
  { item: 'Mahindra Thar 4x4 Off-Roaders', category: 'Vehicle', total: 10, booked: 8, available: 2, status: 'Low Inventory' },
  { item: 'Goa Beach Resort 4-Star Rooms', category: 'Hotel Room', total: 35, booked: 28, available: 7, status: 'Available' },
  { item: 'Heritage Tour Guides', category: 'Guide', total: 8, booked: 6, available: 2, status: 'Available' }
];

export const MOCK_LEDGER = [
  { id: 'tx-1', date: '2026-08-01', description: 'Goa 4D Package Booking #BK-99201', category: 'Revenue', amount: 35000, gst: 1750, status: 'Received' },
  { id: 'tx-2', date: '2026-08-01', description: 'Vendor Payout - The Machan Hotel', category: 'Vendor Payout', amount: 24000, gst: 1200, status: 'Settled' },
  { id: 'tx-3', date: '2026-08-02', description: 'Self-Drive Thar Rental #BK-88402', category: 'Revenue', amount: 10500, gst: 525, status: 'Received' },
  { id: 'tx-4', date: '2026-08-02', description: 'Staff Sales Commission - Amit Patel', category: 'Commission', amount: 1500, gst: 0, status: 'Paid' }
];

export const MOCK_WORKFLOWS = [
  {
    id: 'wf-1',
    event: 'New Enquiry Submitted',
    action: 'Auto-assign to Sales Manager + Send instant SMS & WhatsApp to Customer (9173746558)',
    status: 'ACTIVE'
  },
  {
    id: 'wf-2',
    event: 'Booking Payment Confirmed',
    action: 'Generate Tax GST Invoice + Dispatch voucher & Notify Hotel/Driver',
    status: 'ACTIVE'
  },
  {
    id: 'wf-3',
    event: 'Trip 24 Hours Approaching',
    action: 'Send Driver GPS Tracking Link & Weather forecast reminder to Customer',
    status: 'ACTIVE'
  },
  {
    id: 'wf-4',
    event: 'Trip Completed',
    action: 'Auto-request 5-Star Google/Website Review + Credit 100 Loyalty Points',
    status: 'ACTIVE'
  }
];

export const MOCK_DOCUMENTS = [
  { id: 'doc-1', title: 'Passport_RahulSharma_2026.pdf', category: 'Passport', customer: 'Rahul Sharma', date: '2026-08-01', size: '1.4 MB' },
  { id: 'doc-2', title: 'DrivingLicense_TharRental_Vishal.png', category: 'ID Proof', customer: 'Vishal', date: '2026-08-02', size: '850 KB' },
  { id: 'doc-3', title: 'GST_Invoice_SV-84878.pdf', category: 'Tax Invoice', customer: 'Priya Verma', date: '2026-08-02', size: '420 KB' }
];
