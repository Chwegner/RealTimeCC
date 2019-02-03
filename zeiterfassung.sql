create table positionen
(
  ID       int auto_increment
    primary key,
  position varchar(255) null
);

create table standorte
(
  ID       int auto_increment
    primary key,
  standort varchar(255) null
);

create table userdaten
(
  ID         int auto_increment
    primary key,
  vorname    varchar(30) not null,
  nachname   varchar(30) not null,
  positionID int         null,
  standortID int(30)     null,
  telefon    varchar(30) null,
  mail       varchar(30) not null,
  constraint userdaten_ibfk_1
    foreign key (standortID) references standorte (ID),
  constraint userdaten_ibfk_2
    foreign key (positionID) references positionen (ID)
);

create index positionID
  on userdaten (positionID);

create index standortID
  on userdaten (standortID);


