/**
 * Vehicle Database Service
 * Handles persistent storage of Siddhivinayak Tours fleet vehicles, status tracking,
 * pricing, location, and maintenance schedule.
 */

import { FLEET_CARS } from '../data/mockData';

const VEHICLES_STORAGE_KEY = 'siddhivinayak_vehicles_db_v2';

export const DEFAULT_FLEET_VEHICLES = [
  {
    id: 'veh-001',
    name: 'Mahindra Thar 4x4 Hard Top',
    brand: 'Mahindra',
    model: 'Thar LX Petrol AT 4WD',
    category: 'SUV',
    regNumber: 'GJ-05-ST-2919',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seats: 4,
    pricePerDay: 4499,
    location: 'Surat',
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80'],
    status: 'AVAILABLE',
    maintenanceDates: []
  },
  {
    id: 'veh-002',
    name: 'Toyota Fortuner Legender 4x4',
    brand: 'Toyota',
    model: 'Legender 2.8 Diesel AT',
    category: 'Luxury SUV',
    regNumber: 'MH-02-ST-4004',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    seats: 7,
    pricePerDay: 8999,
    location: 'Mumbai',
    images: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'],
    status: 'AVAILABLE',
    maintenanceDates: []
  },
  {
    id: 'veh-003',
    name: 'Hyundai Creta SX (O) Turbo',
    brand: 'Hyundai',
    model: 'Creta 1.5 Turbo DCT',
    category: 'SUV',
    regNumber: 'GJ-01-ST-8822',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    pricePerDay: 3299,
    location: 'Ahmedabad',
    images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80'],
    status: 'AVAILABLE',
    maintenanceDates: []
  },
  {
    id: 'veh-004',
    name: 'Maruti Suzuki Ertiga VXI',
    brand: 'Maruti Suzuki',
    model: 'Ertiga 1.5 Smart Hybrid',
    category: 'MUV',
    regNumber: 'GJ-05-ST-1102',
    fuelType: 'Petrol / CNG',
    transmission: 'Manual',
    seats: 7,
    pricePerDay: 2899,
    location: 'Surat',
    images: ['https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80'],
    status: 'AVAILABLE',
    maintenanceDates: []
  },
  {
    id: 'veh-005',
    name: 'Mahindra XUV700 AX7 Luxury Pack',
    brand: 'Mahindra',
    model: 'XUV700 AWD Diesel AT',
    category: 'Luxury SUV',
    regNumber: 'MH-12-ST-9090',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    seats: 7,
    pricePerDay: 6499,
    location: 'Pune',
    images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'],
    status: 'AVAILABLE',
    maintenanceDates: []
  },
  {
    id: 'veh-006',
    name: 'Toyota Innova Crysta ZX',
    brand: 'Toyota',
    model: 'Innova Crysta 2.4 Diesel',
    category: 'MUV',
    regNumber: 'GJ-05-ST-5555',
    fuelType: 'Diesel',
    transmission: 'Manual',
    seats: 7,
    pricePerDay: 4999,
    location: 'Surat',
    images: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'],
    status: 'AVAILABLE',
    maintenanceDates: []
  },
  {
    id: 'veh-007',
    name: 'Mercedes-Benz E-Class Exclusive',
    brand: 'Mercedes-Benz',
    model: 'E 220d LWB Luxury',
    category: 'Luxury Sedan',
    regNumber: 'MH-01-ST-0001',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    seats: 5,
    pricePerDay: 14999,
    location: 'Mumbai',
    images: ['https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80'],
    status: 'AVAILABLE',
    maintenanceDates: []
  },
  {
    id: 'veh-008',
    name: 'Force Urbania Luxury Van 17-Seater',
    brand: 'Force Motors',
    model: 'Urbania 3615 Super Long Wheelbase',
    category: 'Luxury Van',
    regNumber: 'GJ-05-ST-7777',
    fuelType: 'Diesel',
    transmission: 'Manual',
    seats: 17,
    pricePerDay: 11999,
    location: 'Surat',
    images: ['https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80'],
    status: 'AVAILABLE',
    maintenanceDates: []
  }
];

class VehicleDatabaseService {
  constructor() {
    this.initDatabase();
  }

  initDatabase() {
    try {
      const stored = localStorage.getItem(VEHICLES_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(VEHICLES_STORAGE_KEY, JSON.stringify(DEFAULT_FLEET_VEHICLES));
      }
    } catch (err) {
      console.error('Error initializing vehicles database', err);
    }
  }

  getVehicles() {
    try {
      const stored = localStorage.getItem(VEHICLES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_FLEET_VEHICLES;
    } catch {
      return DEFAULT_FLEET_VEHICLES;
    }
  }

  saveVehicles(vehicles) {
    localStorage.setItem(VEHICLES_STORAGE_KEY, JSON.stringify(vehicles));
  }

  getVehicleById(id) {
    if (!id) return null;
    const vehicles = this.getVehicles();
    const match = vehicles.find(v => v.id === id || v.name.toLowerCase().includes(id.toLowerCase()));
    if (match) return match;

    const mockMatch = FLEET_CARS.find(c => c.id === id || c.name.toLowerCase().includes(id.toLowerCase()));
    if (mockMatch) {
      return {
        id: mockMatch.id,
        name: mockMatch.name,
        brand: mockMatch.brand,
        model: mockMatch.model,
        category: mockMatch.categoryTag || mockMatch.category,
        regNumber: 'GJ-05-ST-2026',
        fuelType: mockMatch.fuelType,
        transmission: mockMatch.transmission,
        seats: mockMatch.seats,
        pricePerDay: mockMatch.pricePerDay,
        location: 'Surat',
        images: [mockMatch.image, ...(mockMatch.gallery || [])],
        status: 'AVAILABLE',
        maintenanceDates: []
      };
    }
    return null;
  }

  addVehicle(vehicleData) {
    const vehicles = this.getVehicles();
    const newVehicle = {
      id: `veh-${Date.now()}`,
      name: vehicleData.name.trim(),
      brand: vehicleData.brand ? vehicleData.brand.trim() : 'Siddhivinayak Fleet',
      model: vehicleData.model ? vehicleData.model.trim() : vehicleData.name.trim(),
      category: vehicleData.category || 'SUV',
      regNumber: vehicleData.regNumber ? vehicleData.regNumber.trim() : `GJ-05-ST-${Math.floor(1000 + Math.random()*9000)}`,
      fuelType: vehicleData.fuelType || 'Petrol',
      transmission: vehicleData.transmission || 'Automatic',
      seats: Number(vehicleData.seats) || 5,
      pricePerDay: Number(vehicleData.pricePerDay) || 3999,
      location: vehicleData.location || 'Surat',
      images: vehicleData.images && vehicleData.images.length > 0 
        ? vehicleData.images 
        : ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80'],
      status: vehicleData.status || 'AVAILABLE',
      maintenanceDates: vehicleData.maintenanceDates || []
    };

    vehicles.push(newVehicle);
    this.saveVehicles(vehicles);
    return newVehicle;
  }

  updateVehicle(vehicleId, updates) {
    const vehicles = this.getVehicles();
    const index = vehicles.findIndex(v => v.id === vehicleId);

    if (index === -1) throw new Error('Vehicle not found in database.');

    vehicles[index] = { ...vehicles[index], ...updates };
    this.saveVehicles(vehicles);
    return vehicles[index];
  }

  setVehicleStatus(vehicleId, newStatus) {
    return this.updateVehicle(vehicleId, { status: newStatus });
  }

  deleteVehicle(vehicleId) {
    const vehicles = this.getVehicles();
    const filtered = vehicles.filter(v => v.id !== vehicleId);
    this.saveVehicles(filtered);
    return true;
  }
}

export const vehicleDB = new VehicleDatabaseService();
