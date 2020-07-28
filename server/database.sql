CREATE TABLE public.User_credentials
(
  username varchar(50) NOT NULL,
  password varchar(255) NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  CONSTRAINT PK_users PRIMARY KEY (username)
);

CREATE TABLE Users
(
  user_id serial NOT NULL,
  firstname varchar(50) NOT NULL,
  lastname varchar(50) NOT NULL,
  about varchar(255) NULL,
  profilepic varchar(65535) NULL DEFAULT 'https://www.eguardtech.com/wp-content/uploads/2018/08/Network-Profile.png',
  githubhandle varchar(50) NULL,
  username varchar(50) NOT NULL,
  linkedin varchar(255) NULL,
  personalpage varchar(255) NULL,
  CONSTRAINT PK_user_profile PRIMARY KEY (user_id),
  CONSTRAINT FK_34 FOREIGN KEY (username) REFERENCES public.User_credentials (username)
);

CREATE INDEX fkIdx_34 ON Users
(z1
username
);

CREATE TABLE Ideas
(
  idea_id serial NOT NULL,
  name varchar(50) NOT NULL,
  description varchar(255) NOT NULL,
  why varchar(255) NOT NULL,
  when_start date NOT NULL,
  when_end date NULL,
  who int NOT NULL,
  image varchar(65535) NULL DEFAULT 'https://foroalfa.org/imagenes/ilustraciones/idea.png',
  creator_username varchar(50) NOT NULL,
  CONSTRAINT PK_ideas PRIMARY KEY (idea_id),
  CONSTRAINT FK_56 FOREIGN KEY (creator_username) REFERENCES public.User_credentials (username)
);

CREATE INDEX fkIdx_56 ON Ideas
(
 creator_username
);

CREATE TABLE Idea_Participants
(
  idea_id integer NOT NULL,
  participant_username varchar(50) NOT NULL,
  CONSTRAINT FK_59 FOREIGN KEY (idea_id) REFERENCES Ideas ( idea_id ),
  CONSTRAINT FK_62 FOREIGN KEY (participant_username) REFERENCES public.User_credentials (username)
);

CREATE INDEX fkIdx_59 ON Idea_Participants
(
 idea_id
);

CREATE INDEX fkIdx_62 ON Idea_Participants
(
 participant_username
);

CREATE TABLE Favorites
(
  username varchar(50) NOT NULL,
  idea_id integer NOT NULL,
  CONSTRAINT FK_66 FOREIGN KEY (username) REFERENCES public.User_credentials (username),
  CONSTRAINT FK_69 FOREIGN KEY (idea_id) REFERENCES Ideas (idea_id)
);

CREATE INDEX fkIdx_66 ON Favorites
(
 username
);

CREATE INDEX fkIdx_69 ON Favorites
(
 idea_id
);

CREATE TABLE Idea_Tech_Stacks
(
  idea_id integer NOT NULL,
  tech_id integer NOT NULL,
  CONSTRAINT FK_84 FOREIGN KEY ( idea_id ) REFERENCES Ideas (idea_id),
  CONSTRAINT FK_87 FOREIGN KEY ( tech_id ) REFERENCES Tech_Stacks ( tech_id )
);

CREATE INDEX fkIdx_84 ON Idea_Tech_Stacks
(
 idea_id
);

CREATE INDEX fkIdx_87 ON Idea_Tech_Stacks
(
 tech_id
);

CREATE TABLE Tech_Stacks
(
  tech_id serial NOT NULL,
  name varchar(50) NOT NULL,
  CONSTRAINT PK_tech_stacks PRIMARY KEY ( tech_id )
);

CREATE TABLE User_tech_stacks
(
  user_id integer NOT NULL,
  tech_id integer NOT NULL,
  CONSTRAINT FK_94 FOREIGN KEY (user_id) REFERENCES public.Users (user_id),
  CONSTRAINT FK_97 FOREIGN KEY (tech_id) REFERENCES Tech_Stacks
  (tech_id)
);

CREATE INDEX fkIdx_94 ON User_tech_stacks
(
 user_id
);

CREATE INDEX fkIdx_97 ON User_tech_stacks
(
 tech_id
);