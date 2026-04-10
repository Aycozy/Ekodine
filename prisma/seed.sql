-- =============================================
-- DINEDESK SEED DATA
-- Run this AFTER setup.sql in Supabase SQL Editor
-- =============================================

-- Password hash for "password123" (bcrypt)
-- ₦2a₦12₦LQv3c1yqBo9SkvXS7QT3GOq0Gx8fvAYqYOH9aGH7DWLCj.gFiu5h2

-- 1. Create Restaurant
INSERT INTO "Restaurant" ("id", "name", "slug", "address", "phone", "plan")
VALUES (
    'rest_bella_italia_001',
    'Iya Basira Buka',
    'iya-basira',
    'No 45 Allen Avenue, Ikeja, Lagos 100281',
    '+1 (555) 123-4567',
    'PRO'
);

-- 2. Create Users
-- Owner (password: password123)
INSERT INTO "User" ("id", "name", "email", "password", "role", "restaurantId")
VALUES (
    'user_alex_001',
    'Alex Johnson',
    'alex@bellaitalia.com',
    '₦2a₦12₦LQv3c1yqBo9SkvXS7QT3GOq0Gx8fvAYqYOH9aGH7DWLCj.gFiu5h2',
    'OWNER',
    'rest_bella_italia_001'
);

-- Manager
INSERT INTO "User" ("id", "name", "email", "password", "role", "restaurantId")
VALUES (
    'user_maria_002',
    'Maria Garcia',
    'maria@bellaitalia.com',
    '₦2a₦12₦LQv3c1yqBo9SkvXS7QT3GOq0Gx8fvAYqYOH9aGH7DWLCj.gFiu5h2',
    'MANAGER',
    'rest_bella_italia_001'
);

-- Staff
INSERT INTO "User" ("id", "name", "email", "password", "role", "restaurantId")
VALUES
    ('user_james_003', 'James Wilson', 'james@bellaitalia.com', '₦2a₦12₦LQv3c1yqBo9SkvXS7QT3GOq0Gx8fvAYqYOH9aGH7DWLCj.gFiu5h2', 'STAFF', 'rest_bella_italia_001'),
    ('user_sarah_004', 'Sarah Chen', 'sarah@bellaitalia.com', '₦2a₦12₦LQv3c1yqBo9SkvXS7QT3GOq0Gx8fvAYqYOH9aGH7DWLCj.gFiu5h2', 'STAFF', 'rest_bella_italia_001');

-- 3. Create Tables
INSERT INTO "Table" ("id", "name", "seats", "restaurantId")
VALUES
    ('table_01', 'Table 1', 2, 'rest_bella_italia_001'),
    ('table_02', 'Table 2', 2, 'rest_bella_italia_001'),
    ('table_03', 'Table 3', 4, 'rest_bella_italia_001'),
    ('table_05', 'Table 5', 4, 'rest_bella_italia_001'),
    ('table_07', 'Table 7', 6, 'rest_bella_italia_001'),
    ('table_08', 'Table 8', 6, 'rest_bella_italia_001'),
    ('table_10', 'Table 10', 8, 'rest_bella_italia_001'),
    ('table_12', 'Table 12', 8, 'rest_bella_italia_001');

-- 4. Create Menu Items
INSERT INTO "MenuItem" ("id", "name", "description", "price", "category", "available", "restaurantId")
VALUES
    ('menu_01', 'Jollof Rice & Chicken', 'Creamy Nigerian classic with pancetta and parmesan.', 18.50, 'Mains', true, 'rest_bella_italia_001'),
    ('menu_02', 'Abacha (African Salad)', 'Romaine lettuce, croutons, parmesan, and caesar dressing.', 12.00, 'Starters', true, 'rest_bella_italia_001'),
    ('menu_03', 'Pounded Yam & Egusi', 'Fresh mozzarella, tomato sauce, and basil on a thin crust.', 16.00, 'Mains', true, 'rest_bella_italia_001'),
    ('menu_04', 'Grilled Catfish (Point & Kill)', 'Atlantic salmon with lemon butter sauce and seasonal vegetables.', 24.00, 'Mains', false, 'rest_bella_italia_001'),
    ('menu_05', 'Puff Puff', 'Classic Nigerian dessert with espresso-soaked ladyfingers.', 9.50, 'Desserts', true, 'rest_bella_italia_001'),
    ('menu_06', 'Chicken Wings', 'Crispy buffalo wings with ranch dipping sauce.', 14.00, 'Starters', true, 'rest_bella_italia_001'),
    ('menu_07', 'Zobo Drink', 'Fresh mint, lime, white rum, and soda water.', 11.00, 'Drinks', true, 'rest_bella_italia_001'),
    ('menu_08', 'Chocolate Lava Cake', 'Warm chocolate cake with a molten center and vanilla ice cream.', 10.50, 'Desserts', true, 'rest_bella_italia_001'),
    ('menu_09', 'Truffle Fries', 'Hand-cut fries with truffle oil and parmesan shavings.', 8.00, 'Sides', true, 'rest_bella_italia_001'),
    ('menu_10', 'Bruschetta', 'Toasted bread topped with tomatoes, garlic, and basil.', 9.00, 'Starters', true, 'rest_bella_italia_001'),
    ('menu_11', 'Espresso', 'Rich Nigerian espresso shot.', 3.50, 'Drinks', true, 'rest_bella_italia_001'),
    ('menu_12', 'Panna Cotta', 'Vanilla cream dessert with berry compote.', 8.50, 'Desserts', true, 'rest_bella_italia_001');

-- 5. Create Orders
INSERT INTO "Order" ("id", "status", "total", "note", "tableNumber", "restaurantId")
VALUES
    ('order_01', 'PREPARING', 34.50, NULL, 'Table 5', 'rest_bella_italia_001'),
    ('order_02', 'PENDING', 41.00, 'No onions please', 'Table 12', 'rest_bella_italia_001'),
    ('order_03', 'READY', 52.80, NULL, 'Table 3', 'rest_bella_italia_001'),
    ('order_04', 'DELIVERED', 28.50, NULL, 'Table 8', 'rest_bella_italia_001');

-- 6. Create Order Items
INSERT INTO "OrderItem" ("id", "orderId", "menuItemId", "name", "price", "quantity")
VALUES
    ('oi_01', 'order_01', 'menu_01', 'Jollof Rice & Chicken', 18.50, 1),
    ('oi_02', 'order_01', 'menu_02', 'Abacha (African Salad)', 12.00, 1),
    ('oi_03', 'order_02', 'menu_03', 'Pounded Yam & Egusi', 16.00, 2),
    ('oi_04', 'order_02', 'menu_07', 'Zobo Drink', 11.00, 1),
    ('oi_05', 'order_03', 'menu_04', 'Grilled Catfish (Point & Kill)', 24.00, 1),
    ('oi_06', 'order_03', 'menu_07', 'Zobo Drink', 11.00, 2),
    ('oi_07', 'order_04', 'menu_06', 'Chicken Wings', 14.00, 1),
    ('oi_08', 'order_04', 'menu_09', 'Truffle Fries', 8.00, 1);

-- 7. Create Reservations
INSERT INTO "Reservation" ("id", "name", "email", "phone", "partySize", "date", "status", "tableId", "restaurantId")
VALUES
    ('res_01', 'John Smith', 'john@email.com', '+1 555-0101', 4, NOW(), 'CONFIRMED', 'table_05', 'rest_bella_italia_001'),
    ('res_02', 'Emily Davis', 'emily@email.com', '+1 555-0102', 2, NOW(), 'PENDING', NULL, 'rest_bella_italia_001'),
    ('res_03', 'Michael Brown', 'michael@email.com', '+1 555-0103', 6, NOW() + INTERVAL '1 day', 'CONFIRMED', 'table_10', 'rest_bella_italia_001'),
    ('res_04', 'Sarah Wilson', 'sarah@email.com', '+1 555-0104', 3, NOW() + INTERVAL '1 day', 'PENDING', NULL, 'rest_bella_italia_001'),
    ('res_05', 'David Lee', 'david@email.com', '+1 555-0105', 2, NOW() + INTERVAL '2 days', 'CONFIRMED', 'table_01', 'rest_bella_italia_001');
