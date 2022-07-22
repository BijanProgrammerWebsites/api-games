CREATE TABLE `user` (
                        `id` int(11) NOT NULL AUTO_INCREMENT,
                        `username` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
                        `password` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
                        `email` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
                        `phone` varchar(14) DEFAULT NULL,
                        `firstname` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
                        `lastname` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
                        `gender` tinyint(4) DEFAULT NULL,
                        `dateOfBirth` date DEFAULT NULL,
                        `avatar` longtext,
                        PRIMARY KEY (`id`),
                        UNIQUE KEY `username_UNIQUE` (`username`),
                        UNIQUE KEY `email_UNIQUE` (`email`),
                        UNIQUE KEY `phone_UNIQUE` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
