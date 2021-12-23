-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Дек 23 2021 г., 22:28
-- Версия сервера: 10.4.17-MariaDB
-- Версия PHP: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `my_friends`
--

-- --------------------------------------------------------

--
-- Структура таблицы `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `news_id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `likes`
--

INSERT INTO `likes` (`id`, `news_id`, `users_id`) VALUES
(1, 5, 4),
(2, 1, 1),
(3, 5, 5),
(4, 4, 1),
(5, 2, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `text` varchar(400) NOT NULL,
  `image` varchar(100) NOT NULL,
  `users_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `news`
--

INSERT INTO `news` (`id`, `text`, `image`, `users_id`, `created`) VALUES
(1, 'Это было так круто! Спасибо, ребята', 'news_1.jpg', 4, '1996-09-22 20:25:51'),
(2, 'Я и мой друг Марсель', 'news_2.jpg', 2, '1997-02-23 21:25:58'),
(3, 'Сегодня у меня концерт. Мест может не хватить', 'news_3.jpg', 7, '1998-05-12 06:11:32'),
(4, 'Моё любимое кресло', 'news_4.jpg', 6, '2000-02-02 00:11:18'),
(5, 'Никогда не работайте с UBUNTU!!!', 'news_5.png', 1, '2021-12-23 21:21:14');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `age` int(11) NOT NULL,
  `hobby` varchar(20) NOT NULL,
  `avatar` varchar(120) NOT NULL,
  `login` varchar(20) NOT NULL,
  `password` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `age`, `hobby`, `avatar`, `login`, `password`) VALUES
(1, 'Василий', 'Пупкин', 25, 'Ботаника', 'vasya.jpg', 'vasya', '356a192b7913b04c54574d18c28d46e6395428ab'),
(2, 'Росс', 'Геллер', 27, 'Палеонтология', 'ross.jpg', 'ross', '356a192b7913b04c54574d18c28d46e6395428ab'),
(3, 'Рэйчел', 'Грин', 24, 'Мода', 'rachel.jpg', 'rachel', '356a192b7913b04c54574d18c28d46e6395428ab'),
(4, 'Моника', 'Геллер', 24, 'Уборка', 'monica.jpg', 'monica', '356a192b7913b04c54574d18c28d46e6395428ab'),
(5, 'Чендлер', 'Бинг', 26, 'Шутки', 'chandler.jpg', 'chandler', '356a192b7913b04c54574d18c28d46e6395428ab'),
(6, 'Джоуи', 'Триббиани', 26, 'Еда', 'joey.jpg', 'joey', '356a192b7913b04c54574d18c28d46e6395428ab'),
(7, 'Фиби', 'Буффе', 28, 'Пение', 'phoebe.jpg', 'phoebe', '356a192b7913b04c54574d18c28d46e6395428ab');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=206;

--
-- AUTO_INCREMENT для таблицы `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
