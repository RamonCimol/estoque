-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema gerenciador_estoque
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema gerenciador_estoque
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `gerenciador_estoque` ;
USE `gerenciador_estoque` ;

-- -----------------------------------------------------
-- Table `gerenciador_estoque`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gerenciador_estoque`.`categoria` (
  `id_categoria` INT NOT NULL AUTO_INCREMENT,
  `nome_categoria` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_categoria`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gerenciador_estoque`.`fornecedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gerenciador_estoque`.`fornecedor` (
  `id_fornecedor` INT NOT NULL AUTO_INCREMENT,
  `nome_fornecedor` VARCHAR(255) NOT NULL,
  `numero_fornecedor` VARCHAR(45) NULL,
  `cnpj` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_fornecedor`),
  UNIQUE INDEX `cnpj_UNIQUE` (`cnpj` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gerenciador_estoque`.`produtos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gerenciador_estoque`.`produtos` (
  `id_produtos` INT NOT NULL AUTO_INCREMENT,
  `nome_produto` VARCHAR(255) NOT NULL,
  `descricao` TEXT NULL,
  `preco_unitario` DECIMAL(10,2) NOT NULL,
  `estoque_atual` INT NULL DEFAULT 0,
  `estoque_minimo` INT NULL DEFAULT 0,
  `id_categoria` INT NOT NULL,
  PRIMARY KEY (`id_produtos`),
  INDEX `fk_produto_categoria_idx` (`id_categoria` ASC) VISIBLE,
  CONSTRAINT `id_categoria`
    FOREIGN KEY (`id_categoria`)
    REFERENCES `gerenciador_estoque`.`categoria` (`id_categoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gerenciador_estoque`.`produto_has_fornecedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gerenciador_estoque`.`produto_has_fornecedor` (
  `produto_id_produto` INT NOT NULL,
  `fornecedor_id_fornecedor` INT NOT NULL,
  PRIMARY KEY (`produto_id_produto`, `fornecedor_id_fornecedor`),
  INDEX `fk_produtos_has_fornecedores_fornecedores1_idx` (`fornecedor_id_fornecedor` ASC) VISIBLE,
  INDEX `fk_produtos_has_fornecedores_produtos1_idx` (`produto_id_produto` ASC) VISIBLE,
  CONSTRAINT `fk_produtos_has_fornecedores_produtos1`
    FOREIGN KEY (`produto_id_produto`)
    REFERENCES `gerenciador_estoque`.`produtos` (`id_produtos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_produtos_has_fornecedores_fornecedores1`
    FOREIGN KEY (`fornecedor_id_fornecedor`)
    REFERENCES `gerenciador_estoque`.`fornecedor` (`id_fornecedor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gerenciador_estoque`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gerenciador_estoque`.`usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nome_usuario` VARCHAR(60) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  `responsabilidade` ENUM('administrador', 'operador') NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `nome_usuario_UNIQUE` (`nome_usuario` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gerenciador_estoque`.`pedidos_compras`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gerenciador_estoque`.`pedidos_compras` (
  `id_pedidos_compras` INT NOT NULL AUTO_INCREMENT,
  `id_fornecedor` INT NOT NULL,
  `data_pedido` DATETIME NOT NULL,
  `status_pedido` ENUM('feito', 'entregue', 'cancelado') NOT NULL,
  `data_entrega_estimada` DATE NULL,
  PRIMARY KEY (`id_pedidos_compras`),
  INDEX `id_fornecedor_idx` (`id_fornecedor` ASC) VISIBLE,
  CONSTRAINT `id_fornecedor`
    FOREIGN KEY (`id_fornecedor`)
    REFERENCES `gerenciador_estoque`.`fornecedor` (`id_fornecedor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gerenciador_estoque`.`lotes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gerenciador_estoque`.`lotes` (
  `id_lotes` INT NOT NULL AUTO_INCREMENT,
  `id_produto` INT NOT NULL,
  `id_pedido_compra` INT NOT NULL,
  `quantidade_entrada` INT NOT NULL,
  `data_entrada` DATETIME NOT NULL,
  `data_validade` DATE NULL,
  PRIMARY KEY (`id_lotes`),
  INDEX `id_produto_idx` (`id_produto` ASC) VISIBLE,
  INDEX `id_pedido_compra_idx` (`id_pedido_compra` ASC) VISIBLE,
  CONSTRAINT `id_produto`
    FOREIGN KEY (`id_produto`)
    REFERENCES `gerenciador_estoque`.`produtos` (`id_produtos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_pedido_compra`
    FOREIGN KEY (`id_pedido_compra`)
    REFERENCES `gerenciador_estoque`.`pedidos_compras` (`id_pedidos_compras`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gerenciador_estoque`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gerenciador_estoque`.`cliente` (
  `id_cliente` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `telefone` VARCHAR(20) NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gerenciador_estoque`.`vendas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gerenciador_estoque`.`vendas` (
  `id_vendas` INT NOT NULL AUTO_INCREMENT,
  `id_cliente` INT NOT NULL,
  `data_venda` DATETIME NOT NULL,
  `total_venda` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id_vendas`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gerenciador_estoque`.`produtos_vendas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gerenciador_estoque`.`produtos_vendas` (
  `id_produtos_vendas` INT NOT NULL AUTO_INCREMENT,
  `id_vendas` INT NOT NULL,
  `id_produtos` INT NOT NULL,
  `quantidade_vendida` INT NOT NULL,
  `preco_item` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id_produtos_vendas`),
  INDEX `id_venda_idx` (`id_vendas` ASC) VISIBLE,
  INDEX `id_produtos_idx` (`id_produtos` ASC) VISIBLE,
  CONSTRAINT `id_vendas`
    FOREIGN KEY (`id_vendas`)
    REFERENCES `gerenciador_estoque`.`vendas` (`id_vendas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_produtos`
    FOREIGN KEY (`id_produtos`)
    REFERENCES `gerenciador_estoque`.`produtos` (`id_produtos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gerenciador_estoque`.`transacoes_estoque`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gerenciador_estoque`.`transacoes_estoque` (
  `id_transacoes_estoque` INT NOT NULL AUTO_INCREMENT,
  `id_produto` INT NOT NULL,
  `quantidade` INT NOT NULL,
  `tipo_movimentacao` ENUM('entrada', 'saida', 'ajuste', 'perda') NOT NULL,
  `motivo` VARCHAR(255) NOT NULL,
  `data_transacao` DATETIME NOT NULL,
  PRIMARY KEY (`id_transacoes_estoque`),
  INDEX `id_produtos_idx` (`id_produto` ASC) VISIBLE,
  CONSTRAINT `id_produtos`
    FOREIGN KEY (`id_produto`)
    REFERENCES `gerenciador_estoque`.`produtos` (`id_produtos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
