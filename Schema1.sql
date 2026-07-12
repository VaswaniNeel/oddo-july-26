-- ============================================
-- EcoSphere Environmental Module - MySQL Schema
-- ============================================

CREATE DATABASE IF NOT EXISTS ecosphere CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE ecosphere;

-- ---------------------------------
-- Departments
-- ---------------------------------
CREATE TABLE departments (
  id              VARCHAR(20)  PRIMARY KEY,      -- e.g. 'd_ops'
  name            VARCHAR(100) NOT NULL,
  employee_count  INT          NOT NULL DEFAULT 0,
  status          ENUM('Active','Inactive') NOT NULL DEFAULT 'Active'
);

-- ---------------------------------
-- Employees / Users (also used for login/session + role)
-- ---------------------------------
CREATE TABLE employees (
  id             VARCHAR(20)  PRIMARY KEY,        -- e.g. 'e_001'
  name           VARCHAR(100) NOT NULL,
  email          VARCHAR(150) UNIQUE,
  password_hash  VARCHAR(255) NOT NULL,           -- store bcrypt hash, never plain text
  department_id  VARCHAR(20),
  role           ENUM('admin','employee') NOT NULL DEFAULT 'employee',
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- ---------------------------------
-- Emission Factors (reference/lookup table)
-- ---------------------------------
CREATE TABLE emission_factors (
  id       VARCHAR(20)   PRIMARY KEY,             -- e.g. 'ef_elec'
  name     VARCHAR(100)  NOT NULL,                -- e.g. 'Electricity (grid)'
  source   VARCHAR(100)  NOT NULL,                -- e.g. 'Electricity'
  factor   DECIMAL(12,4) NOT NULL,                -- kg CO2e per unit
  unit     VARCHAR(20)   NOT NULL                 -- e.g. 'kWh', 'liters', 'km'
);

-- ---------------------------------
-- Carbon Transactions (the logs)
-- ---------------------------------
CREATE TABLE carbon_transactions (
  id             VARCHAR(20)   PRIMARY KEY,       -- e.g. 'ct_001'
  department_id  VARCHAR(20)   NOT NULL,
  factor_id      VARCHAR(20)   NOT NULL,
  source         VARCHAR(100)  NOT NULL,
  units          DECIMAL(14,2) NOT NULL,
  emissions      DECIMAL(14,2) NOT NULL,          -- kg CO2e, units * factor
  transaction_date DATE        NOT NULL,
  created_by     VARCHAR(20),                     -- employee who logged it
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE,
  FOREIGN KEY (factor_id) REFERENCES emission_factors(id) ON DELETE RESTRICT,
  FOREIGN KEY (created_by) REFERENCES employees(id) ON DELETE SET NULL,
  INDEX idx_dept_date (department_id, transaction_date)
);

-- ---------------------------------
-- Sustainability Goals
-- ---------------------------------
CREATE TABLE goals (
  id             VARCHAR(20)  PRIMARY KEY,        -- e.g. 'g_001'
  name           VARCHAR(150) NOT NULL,
  department_id  VARCHAR(20)  NOT NULL,
  target         INT          NOT NULL,           -- target %
  progress       INT          NOT NULL DEFAULT 0, -- current %
  status         ENUM('On Track','At Risk','Off Track') NOT NULL DEFAULT 'At Risk',
  deadline       DATE         NOT NULL,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

-- ============================================
-- Sample seed data (optional - remove if not needed)
-- ============================================
INSERT INTO departments (id, name, employee_count, status) VALUES
  ('d_ops', 'Operations', 120, 'Active'),
  ('d_mfg', 'Manufacturing', 340, 'Active'),
  ('d_admin', 'Administration', 45, 'Active');

INSERT INTO emission_factors (id, name, source, factor, unit) VALUES
  ('ef_elec', 'Grid Electricity', 'Electricity', 0.4500, 'kWh'),
  ('ef_diesel', 'Diesel Fuel', 'Fuel', 2.6800, 'liters'),
  ('ef_flight', 'Business Air Travel', 'Travel', 0.1500, 'km');

INSERT INTO employees (id, name, email, password_hash, department_id, role) VALUES
  ('e_admin', 'Admin User', 'admin@ecosphere.com', '$2b$10$REPLACE_WITH_REAL_BCRYPT_HASH', 'd_admin', 'admin');

INSERT INTO goals (id, name, department_id, target, progress, status, deadline) VALUES
  ('g_001', 'Reduce Manufacturing Emissions 20%', 'd_mfg', 80, 65, 'At Risk', '2026-12-31');
