import { DEFAULT_INDIAN_CITIES } from '../data/indianCitiesData';

const CITIES_DB_KEY = 'siddhivinayak_cities_db_v1';

class CityDatabaseService {
  constructor() {
    this.initDatabase();
  }

  initDatabase() {
    try {
      const stored = localStorage.getItem(CITIES_DB_KEY);
      if (!stored) {
        localStorage.setItem(CITIES_DB_KEY, JSON.stringify(DEFAULT_INDIAN_CITIES));
      }
    } catch (err) {
      console.error('Error initializing city database', err);
    }
  }

  getCities() {
    try {
      const stored = localStorage.getItem(CITIES_DB_KEY);
      const cities = stored ? JSON.parse(stored) : DEFAULT_INDIAN_CITIES;
      return cities.filter(c => c.status !== 'DISABLED');
    } catch {
      return DEFAULT_INDIAN_CITIES.filter(c => c.status !== 'DISABLED');
    }
  }

  getAllCitiesForAdmin() {
    try {
      const stored = localStorage.getItem(CITIES_DB_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_INDIAN_CITIES;
    } catch {
      return DEFAULT_INDIAN_CITIES;
    }
  }

  saveCities(cities) {
    localStorage.setItem(CITIES_DB_KEY, JSON.stringify(cities));
  }

  getPopularCities() {
    const cities = this.getCities();
    return cities.filter(c => c.popular && c.status !== 'DISABLED');
  }

  searchCities(query = '') {
    const clean = query.toLowerCase().trim();
    const cities = this.getCities();
    
    if (!clean) return cities;

    return cities.filter(c => 
      c.name.toLowerCase().includes(clean) ||
      c.district.toLowerCase().includes(clean) ||
      c.state.toLowerCase().includes(clean)
    );
  }

  // Super Admin CRUD methods
  addCity({ name, district, state, popular = false, status = 'AVAILABLE' }) {
    const cities = this.getAllCitiesForAdmin();

    const newCity = {
      id: `city-${Date.now()}`,
      name: name.trim(),
      district: district ? district.trim() : name.trim(),
      state: state.trim(),
      popular: Boolean(popular),
      status: status || 'AVAILABLE'
    };

    cities.push(newCity);
    this.saveCities(cities);
    return newCity;
  }

  updateCity(cityId, updates) {
    const cities = this.getAllCitiesForAdmin();
    const index = cities.findIndex(c => c.id === cityId);

    if (index === -1) throw new Error('City not found');

    cities[index] = { ...cities[index], ...updates };
    this.saveCities(cities);
    return cities[index];
  }

  deleteCity(cityId) {
    const cities = this.getAllCitiesForAdmin();
    const filtered = cities.filter(c => c.id !== cityId);
    this.saveCities(filtered);
    return true;
  }
}

export const cityDB = new CityDatabaseService();
