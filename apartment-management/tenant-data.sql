CREATE TABLE `empTable` (
  `floor` int(4) NOT NULL auto_increment,
  `unit` int(4) NOT NULL auto_increment,
  `name` varchar(200) NOT NULL,
  `info` varchar(200) NOT NULL,
  PRIMARY KEY  (`floor`, `unit`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;