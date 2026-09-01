/**
 * Prepopulated Comprehensive Indian Cities & Districts Database
 * Includes all major cities, towns, and district headquarters across all Indian States & UTs.
 */

export const DEFAULT_INDIAN_CITIES = [
  // GUJARAT
  { id: 'city-surat', name: 'Surat', district: 'Surat', state: 'Gujarat', popular: true, status: 'AVAILABLE' },
  { id: 'city-ahmedabad', name: 'Ahmedabad', district: 'Ahmedabad', state: 'Gujarat', popular: true, status: 'AVAILABLE' },
  { id: 'city-vadodara', name: 'Vadodara', district: 'Vadodara', state: 'Gujarat', popular: true, status: 'AVAILABLE' },
  { id: 'city-rajkot', name: 'Rajkot', district: 'Rajkot', state: 'Gujarat', popular: true, status: 'AVAILABLE' },
  { id: 'city-gandhinagar', name: 'Gandhinagar', district: 'Gandhinagar', state: 'Gujarat', popular: false, status: 'AVAILABLE' },
  { id: 'city-bhavnagar', name: 'Bhavnagar', district: 'Bhavnagar', state: 'Gujarat', popular: false, status: 'AVAILABLE' },
  { id: 'city-jamnagar', name: 'Jamnagar', district: 'Jamnagar', state: 'Gujarat', popular: false, status: 'AVAILABLE' },
  { id: 'city-junagadh', name: 'Junagadh', district: 'Junagadh', state: 'Gujarat', popular: false, status: 'AVAILABLE' },
  { id: 'city-anand', name: 'Anand', district: 'Anand', state: 'Gujarat', popular: false, status: 'AVAILABLE' },
  { id: 'city-vapi', name: 'Vapi', district: 'Valsad', state: 'Gujarat', popular: false, status: 'AVAILABLE' },
  { id: 'city-navsari', name: 'Navsari', district: 'Navsari', state: 'Gujarat', popular: false, status: 'AVAILABLE' },
  { id: 'city-bhuj', name: 'Bhuj', district: 'Kutch', state: 'Gujarat', popular: false, status: 'AVAILABLE' },
  { id: 'city-somnath', name: 'Somnath (Veraval)', district: 'Gir Somnath', state: 'Gujarat', popular: false, status: 'AVAILABLE' },
  { id: 'city-dwarka', name: 'Dwarka', district: 'Devbhumi Dwarka', state: 'Gujarat', popular: false, status: 'AVAILABLE' },

  // MAHARASHTRA
  { id: 'city-mumbai', name: 'Mumbai', district: 'Mumbai Suburban', state: 'Maharashtra', popular: true, status: 'AVAILABLE' },
  { id: 'city-pune', name: 'Pune', district: 'Pune', state: 'Maharashtra', popular: true, status: 'AVAILABLE' },
  { id: 'city-nagpur', name: 'Nagpur', district: 'Nagpur', state: 'Maharashtra', popular: true, status: 'AVAILABLE' },
  { id: 'city-nashik', name: 'Nashik', district: 'Nashik', state: 'Maharashtra', popular: true, status: 'AVAILABLE' },
  { id: 'city-thane', name: 'Thane', district: 'Thane', state: 'Maharashtra', popular: false, status: 'AVAILABLE' },
  { id: 'city-aurangabad', name: 'Chhatrapati Sambhajinagar (Aurangabad)', district: 'Aurangabad', state: 'Maharashtra', popular: false, status: 'AVAILABLE' },
  { id: 'city-solapur', name: 'Solapur', district: 'Solapur', state: 'Maharashtra', popular: false, status: 'AVAILABLE' },
  { id: 'city-kolhapur', name: 'Kolhapur', district: 'Kolhapur', state: 'Maharashtra', popular: false, status: 'AVAILABLE' },
  { id: 'city-mahabaleshwar', name: 'Mahabaleshwar', district: 'Satara', state: 'Maharashtra', popular: false, status: 'AVAILABLE' },
  { id: 'city-shirdi', name: 'Shirdi', district: 'Ahmednagar', state: 'Maharashtra', popular: false, status: 'AVAILABLE' },

  // DELHI NCR
  { id: 'city-delhi', name: 'Delhi NCR', district: 'New Delhi', state: 'Delhi', popular: true, status: 'AVAILABLE' },
  { id: 'city-noida', name: 'Noida', district: 'Gautam Buddha Nagar', state: 'Uttar Pradesh', popular: true, status: 'AVAILABLE' },
  { id: 'city-gurgaon', name: 'Gurgaon (Gurugram)', district: 'Gurugram', state: 'Haryana', popular: true, status: 'AVAILABLE' },
  { id: 'city-faridabad', name: 'Faridabad', district: 'Faridabad', state: 'Haryana', popular: false, status: 'AVAILABLE' },
  { id: 'city-ghaziabad', name: 'Ghaziabad', district: 'Ghaziabad', state: 'Uttar Pradesh', popular: false, status: 'AVAILABLE' },

  // RAJASTHAN
  { id: 'city-jaipur', name: 'Jaipur', district: 'Jaipur', state: 'Rajasthan', popular: true, status: 'AVAILABLE' },
  { id: 'city-udaipur', name: 'Udaipur', district: 'Udaipur', state: 'Rajasthan', popular: true, status: 'AVAILABLE' },
  { id: 'city-jodhpur', name: 'Jodhpur', district: 'Jodhpur', state: 'Rajasthan', popular: false, status: 'AVAILABLE' },
  { id: 'city-jaisalmer', name: 'Jaisalmer', district: 'Jaisalmer', state: 'Rajasthan', popular: false, status: 'AVAILABLE' },
  { id: 'city-kota', name: 'Kota', district: 'Kota', state: 'Rajasthan', popular: false, status: 'AVAILABLE' },
  { id: 'city-ajmer', name: 'Ajmer', district: 'Ajmer', state: 'Rajasthan', popular: false, status: 'AVAILABLE' },

  // UTTAR PRADESH
  { id: 'city-lucknow', name: 'Lucknow', district: 'Lucknow', state: 'Uttar Pradesh', popular: true, status: 'AVAILABLE' },
  { id: 'city-kanpur', name: 'Kanpur', district: 'Kanpur', state: 'Uttar Pradesh', popular: false, status: 'AVAILABLE' },
  { id: 'city-varanasi', name: 'Varanasi (Kashi)', district: 'Varanasi', state: 'Uttar Pradesh', popular: true, status: 'AVAILABLE' },
  { id: 'city-prayagraj', name: 'Prayagraj (Allahabad)', district: 'Prayagraj', state: 'Uttar Pradesh', popular: false, status: 'AVAILABLE' },
  { id: 'city-ayodhya', name: 'Ayodhya', district: 'Ayodhya', state: 'Uttar Pradesh', popular: true, status: 'AVAILABLE' },
  { id: 'city-gorakhpur', name: 'Gorakhpur', district: 'Gorakhpur', state: 'Uttar Pradesh', popular: false, status: 'AVAILABLE' },
  { id: 'city-agra', name: 'Agra', district: 'Agra', state: 'Uttar Pradesh', popular: false, status: 'AVAILABLE' },
  { id: 'city-mathura', name: 'Mathura & Vrindavan', district: 'Mathura', state: 'Uttar Pradesh', popular: false, status: 'AVAILABLE' },

  // UTTARAKHAND & HIMACHAL PRADESH
  { id: 'city-dehradun', name: 'Dehradun', district: 'Dehradun', state: 'Uttarakhand', popular: false, status: 'AVAILABLE' },
  { id: 'city-haridwar', name: 'Haridwar', district: 'Haridwar', state: 'Uttarakhand', popular: false, status: 'AVAILABLE' },
  { id: 'city-rishikesh', name: 'Rishikesh', district: 'Dehradun', state: 'Uttarakhand', popular: false, status: 'AVAILABLE' },
  { id: 'city-shimla', name: 'Shimla', district: 'Shimla', state: 'Himachal Pradesh', popular: false, status: 'AVAILABLE' },
  { id: 'city-manali', name: 'Manali', district: 'Kullu', state: 'Himachal Pradesh', popular: false, status: 'AVAILABLE' },
  { id: 'city-dharamshala', name: 'Dharamshala', district: 'Kangra', state: 'Himachal Pradesh', popular: false, status: 'AVAILABLE' },

  // PUNJAB & HARYANA
  { id: 'city-chandigarh', name: 'Chandigarh', district: 'Chandigarh', state: 'Chandigarh', popular: true, status: 'AVAILABLE' },
  { id: 'city-amritsar', name: 'Amritsar', district: 'Amritsar', state: 'Punjab', popular: false, status: 'AVAILABLE' },
  { id: 'city-ludhiana', name: 'Ludhiana', district: 'Ludhiana', state: 'Punjab', popular: false, status: 'AVAILABLE' },
  { id: 'city-jalandhar', name: 'Jalandhar', district: 'Jalandhar', state: 'Punjab', popular: false, status: 'AVAILABLE' },

  // KARNATAKA
  { id: 'city-bengaluru', name: 'Bengaluru (Bangalore)', district: 'Bengaluru Urban', state: 'Karnataka', popular: true, status: 'AVAILABLE' },
  { id: 'city-mysuru', name: 'Mysuru (Mysore)', district: 'Mysuru', state: 'Karnataka', popular: false, status: 'AVAILABLE' },
  { id: 'city-mangaluru', name: 'Mangaluru', district: 'Dakshina Kannada', state: 'Karnataka', popular: false, status: 'AVAILABLE' },
  { id: 'city-hubballi', name: 'Hubballi-Dharwad', district: 'Dharwad', state: 'Karnataka', popular: false, status: 'COMING_SOON' },

  // TELANGANA & ANDHRA PRADESH
  { id: 'city-hyderabad', name: 'Hyderabad', district: 'Hyderabad', state: 'Telangana', popular: true, status: 'AVAILABLE' },
  { id: 'city-warangal', name: 'Warangal', district: 'Warangal', state: 'Telangana', popular: false, status: 'COMING_SOON' },
  { id: 'city-visakhapatnam', name: 'Visakhapatnam (Vizag)', district: 'Visakhapatnam', state: 'Andhra Pradesh', popular: false, status: 'AVAILABLE' },
  { id: 'city-vijayawada', name: 'Vijayawada', district: 'NTR', state: 'Andhra Pradesh', popular: false, status: 'AVAILABLE' },
  { id: 'city-tirupati', name: 'Tirupati', district: 'Tirupati', state: 'Andhra Pradesh', popular: false, status: 'AVAILABLE' },

  // TAMIL NADU
  { id: 'city-chennai', name: 'Chennai', district: 'Chennai', state: 'Tamil Nadu', popular: true, status: 'AVAILABLE' },
  { id: 'city-coimbatore', name: 'Coimbatore', district: 'Coimbatore', state: 'Tamil Nadu', popular: false, status: 'AVAILABLE' },
  { id: 'city-madurai', name: 'Madurai', district: 'Madurai', state: 'Tamil Nadu', popular: false, status: 'AVAILABLE' },
  { id: 'city-salem', name: 'Salem', district: 'Salem', state: 'Tamil Nadu', popular: false, status: 'COMING_SOON' },

  // KERALA
  { id: 'city-kochi', name: 'Kochi (Cochin)', district: 'Ernakulam', state: 'Kerala', popular: true, status: 'AVAILABLE' },
  { id: 'city-trivandrum', name: 'Thiruvananthapuram (Trivandrum)', district: 'Thiruvananthapuram', state: 'Kerala', popular: false, status: 'AVAILABLE' },
  { id: 'city-kozhikode', name: 'Kozhikode (Calicut)', district: 'Kozhikode', state: 'Kerala', popular: false, status: 'COMING_SOON' },

  // GOA
  { id: 'city-goa', name: 'Goa (Panaji & Madgaon)', district: 'North & South Goa', state: 'Goa', popular: true, status: 'AVAILABLE' },

  // WEST BENGAL & NORTHEAST
  { id: 'city-kolkata', name: 'Kolkata', district: 'Kolkata', state: 'West Bengal', popular: true, status: 'AVAILABLE' },
  { id: 'city-siliguri', name: 'Siliguri', district: 'Darjeeling', state: 'West Bengal', popular: false, status: 'AVAILABLE' },
  { id: 'city-guwahati', name: 'Guwahati', district: 'Kamrup Metropolitan', state: 'Assam', popular: false, status: 'AVAILABLE' },
  { id: 'city-gangtok', name: 'Gangtok', district: 'East Sikkim', state: 'Sikkim', popular: false, status: 'AVAILABLE' },
  { id: 'city-shillong', name: 'Shillong', district: 'East Khasi Hills', state: 'Meghalaya', popular: false, status: 'COMING_SOON' },
  { id: 'city-itanagar', name: 'Itanagar', district: 'Papum Pare', state: 'Arunachal Pradesh', popular: false, status: 'COMING_SOON' },
  { id: 'city-imphal', name: 'Imphal', district: 'Imphal West', state: 'Manipur', popular: false, status: 'COMING_SOON' },
  { id: 'city-aizawl', name: 'Aizawl', district: 'Aizawl', state: 'Mizoram', popular: false, status: 'COMING_SOON' },
  { id: 'city-kohima', name: 'Kohima', district: 'Kohima', state: 'Nagaland', popular: false, status: 'COMING_SOON' },
  { id: 'city-agartala', name: 'Agartala', district: 'West Tripura', state: 'Tripura', popular: false, status: 'COMING_SOON' },

  // BIHAR & JHARKHAND
  { id: 'city-patna', name: 'Patna', district: 'Patna', state: 'Bihar', popular: false, status: 'AVAILABLE' },
  { id: 'city-gaya', name: 'Gaya & Bodh Gaya', district: 'Gaya', state: 'Bihar', popular: false, status: 'AVAILABLE' },
  { id: 'city-ranchi', name: 'Ranchi', district: 'Ranchi', state: 'Jharkhand', popular: false, status: 'AVAILABLE' },
  { id: 'city-jamshedpur', name: 'Jamshedpur', district: 'East Singhbhum', state: 'Jharkhand', popular: false, status: 'COMING_SOON' },

  // MP & CHHATTISGARH
  { id: 'city-indore', name: 'Indore', district: 'Indore', state: 'Madhya Pradesh', popular: true, status: 'AVAILABLE' },
  { id: 'city-bhopal', name: 'Bhopal', district: 'Bhopal', state: 'Madhya Pradesh', popular: false, status: 'AVAILABLE' },
  { id: 'city-jabalpur', name: 'Jabalpur', district: 'Jabalpur', state: 'Madhya Pradesh', popular: false, status: 'AVAILABLE' },
  { id: 'city-raipur', name: 'Raipur', district: 'Raipur', state: 'Chhattisgarh', popular: false, status: 'AVAILABLE' },
  { id: 'city-bhubaneswar', name: 'Bhubaneswar & Puri', district: 'Khurda', state: 'Odisha', popular: false, status: 'AVAILABLE' }
];
