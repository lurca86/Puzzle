-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-04-2016 a las 19:34:42
-- Versión del servidor: 5.6.21
-- Versión de PHP: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `puzzles`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nivel`
--

CREATE TABLE IF NOT EXISTS `nivel` (
  `codigo_nivel` int(11) NOT NULL,
  `tempo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `nivel`
--

INSERT INTO `nivel` (`codigo_nivel`, `tempo`) VALUES
(1, 60),
(2, 45),
(3, 30),
(4, 20),
(5, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pezas`
--

CREATE TABLE IF NOT EXISTS `pezas` (
  `codigo_puzzle` int(11) NOT NULL,
  `codigo_peza` int(11) NOT NULL,
  `peza_taboleiro` varchar(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `pezas`
--

INSERT INTO `pezas` (`codigo_puzzle`, `codigo_peza`, `peza_taboleiro`) VALUES
(1, 1, 'pezatab-1'),
(1, 2, 'pezatab-2'),
(1, 3, 'pezatab-3'),
(1, 4, 'pezatab-4'),
(2, 1, 'pezatab-1'),
(2, 2, 'pezatab-2'),
(2, 3, 'pezatab-3'),
(2, 4, 'pezatab-4'),
(3, 1, 'pezatab-1'),
(3, 2, 'pezatab-2'),
(3, 3, 'pezatab-3'),
(3, 4, 'pezatab-4'),
(4, 1, 'pezatab-1'),
(4, 2, 'pezatab-2'),
(4, 3, 'pezatab-3'),
(4, 4, 'pezatab-4'),
(5, 1, 'pezatab-1'),
(5, 2, 'pezatab-2'),
(5, 3, 'pezatab-3'),
(5, 4, 'pezatab-4'),
(6, 1, 'pezatab-1'),
(6, 2, 'pezatab-2'),
(6, 3, 'pezatab-3'),
(6, 4, 'pezatab-4'),
(7, 1, 'pezatab-1'),
(7, 2, 'pezatab-2'),
(7, 3, 'pezatab-3'),
(7, 4, 'pezatab-4'),
(8, 1, 'pezatab-1'),
(8, 2, 'pezatab-2'),
(8, 3, 'pezatab-3'),
(8, 4, 'pezatab-4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puzzle`
--

CREATE TABLE IF NOT EXISTS `puzzle` (
  `codigo_puzzle` int(11) NOT NULL,
  `taboleiro` int(11) NOT NULL,
  `miniatura` int(11) NOT NULL,
  `nome` varchar(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `puzzle`
--

INSERT INTO `puzzle` (`codigo_puzzle`, `taboleiro`, `miniatura`, `nome`) VALUES
(1, 1, 1, 'Maimiño'),
(2, 2, 2, 'Nemo'),
(3, 3, 3, 'Telerín'),
(4, 4, 4, 'Goku'),
(5, 5, 5, 'Porquiños'),
(6, 6, 6, 'Chicho'),
(7, 7, 7, 'Minions'),
(8, 8, 8, 'Shrek');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `xogador`
--

CREATE TABLE IF NOT EXISTS `xogador` (
  `codigo_xogador` int(11) NOT NULL,
  `alcume` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `codigo_nivel` int(11) NOT NULL,
  `codigo_puzzle` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `xogador`
--

INSERT INTO `xogador` (`codigo_xogador`, `alcume`, `codigo_nivel`, `codigo_puzzle`) VALUES
(1, 'Pepe da Chousa', 2, 1),
(2, 'Manolo do Bombo', 3, 2),
(3, 'Alba', 1, 7),
(4, 'Puzzle3', 2, 3),
(5, 'Puzzle4', 3, 4),
(6, 'Puzzle5', 5, 5),
(7, 'Puzzle6', 4, 6),
(8, 'Puzzle8', 4, 8);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `nivel`
--
ALTER TABLE `nivel`
 ADD PRIMARY KEY (`codigo_nivel`), ADD KEY `codigo_nivel` (`codigo_nivel`);

--
-- Indices de la tabla `pezas`
--
ALTER TABLE `pezas`
 ADD PRIMARY KEY (`codigo_puzzle`,`codigo_peza`), ADD KEY `codigo_puzzle` (`codigo_puzzle`);

--
-- Indices de la tabla `puzzle`
--
ALTER TABLE `puzzle`
 ADD PRIMARY KEY (`codigo_puzzle`), ADD KEY `codigo_puzzle` (`codigo_puzzle`);

--
-- Indices de la tabla `xogador`
--
ALTER TABLE `xogador`
 ADD PRIMARY KEY (`codigo_xogador`), ADD KEY `codigo_nivel` (`codigo_nivel`), ADD KEY `codigo_puzzle` (`codigo_puzzle`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pezas`
--
ALTER TABLE `pezas`
ADD CONSTRAINT `pezas_ibfk_1` FOREIGN KEY (`codigo_puzzle`) REFERENCES `puzzle` (`codigo_puzzle`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `xogador`
--
ALTER TABLE `xogador`
ADD CONSTRAINT `xogador_ibfk_1` FOREIGN KEY (`codigo_nivel`) REFERENCES `nivel` (`codigo_nivel`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `xogador_ibfk_2` FOREIGN KEY (`codigo_puzzle`) REFERENCES `puzzle` (`codigo_puzzle`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
