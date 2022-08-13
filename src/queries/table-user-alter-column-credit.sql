ALTER TABLE `codestar_games`.`user`
ADD COLUMN `credit` INT(10) NOT NULL DEFAULT 0 AFTER `avatar`;
