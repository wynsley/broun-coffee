const {-*--*- - END OF FILE -*- -*-}
const crypto = require('crypto');

const API_BASE_URL = 'http://localhost:3000';

// --- HELPERS ---

// A simple test runner to keep code DRY
const runTest = async (name, testFn) => {
  try {
    await testFn();
    console.log(`✅ PASS: ${name}`);
    return true;
  } catch (error) {
    console.error(`❌ FAIL: ${name} (${error.message})`);
    return false;
  }
};

// --- AUTH ---

/**
 * Logs in a user and returns the authentication cookie.
 * @returns {Promise<string>} The authentication cookie string.
 */
const loginAndGetCookie = async () => {
  // IMPORTANT: These credentials must exist in your database.
  const email = 'admin@broun.com';
  const password = 'adminpassword';

  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(`Login failed with status ${response.status}`);
  }

  const cookie = response.headers.get('set-cookie');
  if (!cookie) {
    throw new Error('Authentication cookie not found in response');
  }
  return cookie;
};


// --- TEST SCENARIOS ---

const testCreateContactMessage = async () => {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message from our automated script.',
    }),
  });
  if (response.status !== 201) {
    throw new Error(`Expected status 201, but got ${response.status}`);
  }
};

const testCreateReservation = async () => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 7); // 1 week from now

  const response = await fetch(`${API_BASE_URL}/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerName: 'Automated Test Booking',
      customerEmail: 'qa@example.com',
      customerPhone: '123456789',
      numberOfPeople: 2,
      reservationDate: futureDate.toISOString(),
    }),
  });
  if (response.status !== 201) {
    throw new Error(`Expected status 201, but got ${response.status}`);
  }
};

const testCreatePromotion = async (authCookie) => {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1);

  const response = await fetch(`${API_BASE_URL}/promotions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': authCookie,
    },
    body: JSON.stringify({
      title: 'Automated Test Promo',
      description: 'A special discount for our automated tests.',
      discountPercentage: 15.5,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    }),
  });

  if (response.status !== 201) {
    throw new Error(`Expected status 201, but got ${response.status}`);
  }
};

const testCreateOrder = async (authCookie) => {
  // IMPORTANT: This test assumes a product with this UUID exists in your database.
  // For a fully independent test, you would first create a product.
  const existingProductId = 'a1b2c3d4-e5f6-7890-1234-567890abcdef';

  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': authCookie,
    },
    body: JSON.stringify({
      total: 12.50,
      details: [
        {
          productId: existingProductId,
          quantity: 2,
          price: 6.25,
        },
      ],
    }),
  });

  if (response.status !== 201) {
    const errorBody = await response.text();
    throw new Error(`Expected status 201, but got ${response.status}. Body: ${errorBody}`);
  }
};


// --- MAIN EXECUTION ---

const main = async () => {
  console.log('--- Starting Endpoint Test Suite ---');
  let authCookie;

  // Run public tests
  await runTest('Enviar Mensaje de Contacto (Public)', testCreateContactMessage);
  await runTest('Crear una Reserva (Public)', testCreateReservation);

  console.log('\n--- Running Authenticated Tests ---');
  try {
    authCookie = await loginAndGetCookie();
    console.log('✅ PASS: Login successful');

    // Run protected tests
    await runTest('Crear una Promoción (Protected)', () => testCreatePromotion(authCookie));
    await runTest('Crear una Orden (Protected)', () => testCreateOrder(authCookie));

  } catch (error) {
    console.error(`❌ FAIL: Could not perform authenticated tests. Reason: ${error.message}`);
  }

  console.log('\n--- Test Suite Finished ---');
};

main();
