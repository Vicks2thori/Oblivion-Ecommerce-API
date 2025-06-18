-- USUÁRIOS
CREATE TABLE user (
  id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  type ENUM('client', 'admin') NOT NULL
);

CREATE TABLE client (
  id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id SMALLINT UNSIGNED NOT NULL UNIQUE,
  cpf CHAR(11) NOT NULL UNIQUE,
  phone CHAR(11) NOT NULL UNIQUE,
  FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE admin (
  id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id SMALLINT UNSIGNED NOT NULL UNIQUE,
  status BOOLEAN NOT NULL DEFAULT TRUE,
  FOREIGN KEY (user_id) REFERENCES user(id)
);

-- ASSETS
CREATE TABLE image (
  id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  path VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE img_payment (
  id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  path VARCHAR(100) NOT NULL UNIQUE
);

-- PRODUTO
CREATE TABLE category (
  id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  status BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE product (
  id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  image_id SMALLINT UNSIGNED,
  description TEXT,
  price DECIMAL(8,2) NOT NULL DEFAULT 0,
  code BIGINT NOT NULL UNIQUE,
  status BOOLEAN NOT NULL DEFAULT TRUE,
  category_id TINYINT UNSIGNED NOT NULL,
  quantity SMALLINT UNSIGNED NOT NULL,
  FOREIGN KEY (image_id) REFERENCES image(id),
  FOREIGN KEY (category_id) REFERENCES category(id),
);

-- PEDIDO
CREATE TABLE order (
  id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  code CHAR(5) NOT NULL UNIQUE,
  client_id SMALLINT UNSIGNED NOT NULL,
  payment_id TINYINT UNSIGNED NOT NULL,
  payment_condition_id TINYINT UNSIGNED NOT NULL,
  total DECIMAL(10,2) NOT NULL, -- acho que vou precisar de uma tabela intediária pra guardar o total
  status ENUM('pending', 'cancel', 'approved') NOT NULL DEFAULT 'pending', -- preciso ver se vai ter o "em conversa" se bem que ele é só um status intermediário
  FOREIGN KEY (client_id) REFERENCES client(id),
  FOREIGN KEY (payment_id) REFERENCES payment(id),
  FOREIGN KEY (payment_condition_id) REFERENCES payment_condition(id)
);

CREATE TABLE order_item (
  id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id SMALLINT UNSIGNED NOT NULL,
  product_id SMALLINT UNSIGNED NOT NULL,
  quantity SMALLINT UNSIGNED NOT NULL,
  subtotal DECIMAL(8,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES product(id)
);

-- PAGAMENTO
CREATE TABLE payment_condition (
  id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  status BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE payment (
  id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  image_id TINYINT UNSIGNED NOT NULL,
  condition_id TINYINT UNSIGNED NOT NULL,
  status BOOLEAN NOT NULL DEFAULT TRUE,
  FOREIGN KEY (image_id) REFERENCES img_payment(id),
  FOREIGN KEY (condition_id) REFERENCES payment_condition(id)
);

CREATE TABLE payment_has_condition (
  payment_id TINYINT UNSIGNED NOT NULL,
  condition_id TINYINT UNSIGNED NOT NULL,
  PRIMARY KEY (payment_id, condition_id),
  FOREIGN KEY (payment_id) REFERENCES payment(id) ON DELETE CASCADE,
  FOREIGN KEY (condition_id) REFERENCES payment_condition(id) ON DELETE CASCADE
);

-- ESTOQUE
CREATE TABLE stock_category (
  id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  status BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE stock_movement (
  id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  category_id SMALLINT UNSIGNED NOT NULL,
  admin_id TINYINT UNSIGNED NOT NULL,
  type ENUM('exit', 'entry', 'adjustment') NOT NULL,
  FOREIGN KEY (category_id) REFERENCES stock_category(id),
  FOREIGN KEY (admin_id) REFERENCES admin(id),
);

CREATE TABLE stock_movement_item (
  id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  stock_movement_id SMALLINT UNSIGNED NOT NULL,
  product_id SMALLINT UNSIGNED NOT NULL,
  quantity SMALLINT NOT NULL,
  FOREIGN KEY (stock_movement_id) REFERENCES stock_movement(id),
  FOREIGN KEY (product_id) REFERENCES product(id)
);

-- EMPRESA
CREATE TABLE enterprise (
  id BIT PRIMARY KEY, -- só vai ter 1 registro, que vou passar nas funções
  name VARCHAR(50) NOT NULL,
  logo_image VARCHAR(100), -- vou salvar aqui mesmo a pasta dela
  phone CHAR(11) NOT NULL,
  instagram VARCHAR(30),
  facebook VARCHAR(50),
  email VARCHAR(50)
);

CREATE TABLE site (
  id BIT PRIMARY KEY,
  primary_color CHAR(6) NOT NULL DEFAULT '000000',
  secondary_color CHAR(6) NOT NULL DEFAULT '123456',
  text_color CHAR(6) NOT NULL DEFAULT 'FFFFFF',
);
