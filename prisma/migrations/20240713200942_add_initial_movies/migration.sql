-- Inserir Diretores
INSERT INTO "Director" (name) VALUES 
('Christopher Nolan'), 
('Quentin Tarantino'), 
('Steven Spielberg'), 
('Martin Scorsese'), 
('Ridley Scott'),
('Mel Gibson');

-- Inserir Categorias
INSERT INTO "Genre" (name) VALUES 
('Ação'), 
('Comédia'), 
('Drama'), 
('Ficção Científica'), 
('Suspense');

-- Inserir Atores
INSERT INTO "Actor" (name) VALUES 
('Leonardo DiCaprio'), 
('Brad Pitt'), 
('Scarlett Johansson'), 
('Tom Hanks'), 
('Morgan Freeman'), 
('Natalie Portman'), 
('Matt Damon'), 
('Johnny Depp'), 
('Robert Downey Jr.'), 
('Angelina Jolie'),
('Jim Caviezel');

-- Inserir Filmes
INSERT INTO "Movie" ("title", "description", "releaseDate", "directorId", "genreId", "photoUrl", "createdAt", "updatedAt", "isActive") VALUES
('A Origem', 'Um ladrão que rouba segredos corporativos por meio do uso de tecnologia de compartilhamento de sonhos é incumbido da tarefa inversa de plantar uma ideia na mente de um C.E.O.', '2010-07-16', 1, 4, 'https://upload.wikimedia.org/wikipedia/pt/8/84/AOrigemPoster.jpg', now(), now(), true),
('Pulp Fiction', 'As vidas de dois assassinos de aluguel, um boxeador, um gângster e sua esposa, e um casal de assaltantes se entrelaçam em quatro histórias de violência e redenção.', '1994-10-14', 2, 5, 'https://upload.wikimedia.org/wikipedia/pt/8/82/Pulp_Fiction_cover.jpg', '2023-02-01', '2023-02-01', true),
('Parque dos Dinossauros', 'Durante uma visita prévia, um parque temático sofre uma grande falha de energia que permite que suas exposições de dinossauros clonados fiquem fora de controle.', '1993-06-11', 3, 4, 'https://upload.wikimedia.org/wikipedia/pt/e/e7/Jurassic_Park_poster.jpg', '2023-03-01', '2023-03-01', true),
('O Lobo de Wall Street', 'Baseado na história verídica de Jordan Belfort, desde sua ascensão a um corretor de ações rico vivendo a vida alta até sua queda envolvendo crime, corrupção e o governo federal.', '2013-12-25', 4, 3, 'https://upload.wikimedia.org/wikipedia/pt/8/8d/The_Wolf_of_Wall_Street.jpg', '2023-04-01', '2023-04-01', true),
('Gladiador', 'Um ex-general romano busca vingança contra o imperador corrupto que assassinou sua família e o enviou à escravidão.', '2000-05-05', 5, 1, 'https://upload.wikimedia.org/wikipedia/pt/4/44/GladiadorPoster.jpg', '2023-05-01', '2023-05-01', true),
('Matrix', 'Um hacker de computadores descobre através de misteriosos rebeldes a verdadeira natureza de sua realidade e seu papel na guerra contra seus controladores.', '1999-03-31', 1, 4, 'https://img.elo7.com.br/product/zoom/2679A17/big-poster-filme-matrix-lo02-tamanho-90x60-cm-poster-de-filme.jpg', '2023-06-01', '2023-06-01', true),
('Clube da Luta', 'Um trabalhador de escritório insone e um fabricante de sabonetes formam um clube de luta clandestino que se transforma em algo muito maior.', '1999-10-15', 4, 5, 'https://upload.wikimedia.org/wikipedia/pt/2/2b/FightClubPoster.jpg', '2023-07-01', '2023-07-01', true),
('Interestelar', 'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço em uma tentativa de garantir a sobrevivência da humanidade.', '2014-11-07', 1, 4, 'https://upload.wikimedia.org/wikipedia/pt/3/3a/Interstellar_Filme.png', '2023-08-01', '2023-08-01', true),
('O Cavaleiro das Trevas', 'Quando o vilão conhecido como o Coringa emerge de seu passado misterioso, ele cria caos e destruição nas pessoas de Gotham.', '2008-07-18', 1, 1, 'https://upload.wikimedia.org/wikipedia/pt/d/d1/The_Dark_Knight.jpg', '2023-09-01', '2023-09-01', true),
('Bastardos Inglórios', 'Na França ocupada pelos nazistas durante a Segunda Guerra Mundial, um plano para assassinar líderes nazistas por um grupo de soldados judeus coincide com os planos vingativos de uma dona de teatro para o mesmo.', '2009-08-21', 2, 1, 'https://br.web.img2.acsta.net/medias/nmedia/18/90/43/36/20096333.jpg', '2023-10-01', '2023-10-01', true),
('Titanic', 'Um artista pobre e uma jovem rica se apaixonam a bordo do luxuoso, mas condenado R.M.S. Titanic.', '1997-12-19', 3, 3, 'https://static.wikia.nocookie.net/dublagempedia/images/f/f3/1.jpg/revision/latest?cb=20180409011826&path-prefix=pt-br', '2023-11-01', '2023-11-01', true),
('O Resgate do Soldado Ryan', 'Após a invasão da Normandia, um grupo de soldados é enviado para trás das linhas inimigas para recuperar um paraquedista cujo irmãos foram mortos em combate.', '1998-07-24', 3, 1, 'https://http2.mlstatic.com/D_NQ_NP_776202-MLA76294148179_052024-OO.jpg', '2023-12-01', '2023-12-01', true),
('O Silêncio dos Inocentes', 'Um jovem agente do F.B.I. deve receber a ajuda de um assassino canibal manipulado para ajudar a capturar outro serial killer.', '1991-02-14', 2, 5, 'https://lozengelis.wordpress.com/wp-content/uploads/2021/07/silencio-entreter-se.jpg', '2024-01-01', '2024-01-01', true),
('Clube dos Cinco', 'Cinco estudantes de diferentes grupos sociais são forçados a passar um sábado juntos em detenção. Eles descobrem que têm mais em comum do que pensavam.', '1985-02-15', 4, 2, 'https://cinema10.com.br/upload/featuredImage.php?url=https%3A%2F%2Fcinema10.com.br%2Fupload%2Ffilmes%2Ffilmes_4085_21010003-20130603204213408-easy-resize.com.jpg', '2024-02-01', '2024-02-01', true),
('Vingadores: Ultimato', 'Os Vingadores tomam uma posição final contra Thanos em um esforço para desfazer suas ações e restaurar a ordem ao universo.', '2019-04-26', 1, 1, 'https://br.web.img3.acsta.net/pictures/19/04/26/17/30/2428965.jpg', '2024-03-01', '2024-03-01', true),
('Forrest Gump', 'Os presidenciáveis aventuras de um homem do Alabama com um QI baixo, cujas ações inesperadas influenciam várias décadas da história dos EUA.', '1994-07-06', 4, 3, 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@.V1_FMjpg_UX1000.jpg', '2024-04-01', '2024-04-01', true),
('O Exterminador do Futuro 2: O Julgamento Final', 'Um ciborgue idêntico ao que falhou em matar Sarah Connor deve agora proteger seu filho, John Connor, de um mais avançado e poderoso Exterminador.', '1991-07-03', 3, 1, 'https://br.web.img2.acsta.net/medias/nmedia/18/92/91/08/20224693.jpg', '2024-05-01', '2024-05-01', true),
('Matrix Reloaded', 'Neo e os rebeldes agora têm apenas 72 horas para proteger Zion da invasão maciça de máquinas. Enquanto isso, Neo deve decidir como salvar Trinity de um destino sombrio dentro de seus sonhos.', '2003-05-15', 1, 4, 'https://musicart.xboxlive.com/7/a71f1100-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080', '2024-06-01', '2024-06-01', true),
('Homem de Ferro', 'Depois de ser mantido em cativeiro em uma caverna afegã, o bilionário engenheiro Tony Stark cria uma armadura de alta tecnologia para escapar.', '2008-05-02', 4, 4, 'https://br.web.img3.acsta.net/medias/nmedia/18/91/79/19/20163665.jpg', '2024-07-01', '2024-07-01', true),
('V de Vingança', 'No futuro próximo, um jovem que luta contra um regime totalitário, conhece uma figura carismática e misteriosa conhecida apenas como "V".', '2005-03-17', 5, 4, 'https://br.web.img2.acsta.net/pictures/210/506/21050637_20131017235623573.jpg', '2024-08-01', '2024-08-01', true),
('O Grande Lebowski', 'Jeff "The Dude" Lebowski, confundido com um milionário do mesmo nome, busca a restauração de seu tapete arruinado e se encontra envolvido em uma complicada trama de sequestro.', '1998-03-06', 2, 2, 'https://m.media-amazon.com/images/S/pv-target-images/4a81dfeb2b21581c4d1bfe87e6316b4c0d8cf0d6d73c10604cc4e953f8687c8a.jpg', '2024-09-01', '2024-09-01', true),
('Mad Max: Estrada da Fúria', 'Em um futuro deserto pós-apocalíptico, Max ajuda uma rebeldia imperadora e um grupo de mulheres a escapar de um tirano e seu exército em um trailer blindado.', '2015-05-15', 5, 1, 'https://m.media-amazon.com/images/S/pv-target-images/f751f274cb2835ccc6d09ff239383d3824d90fcca561a23c1480d1eb9bdee362.jpg', '2024-10-01', '2024-10-01', true),
('A Paixão de Cristo', 'As últimas 12 horas da vida de Jesus de Nazaré (James Caviezel). No meio da noite, Jesus é traído por Judas (Luca Lionello) e é preso por soldados no Monte das Oliveiras, sob o comando de religiosos hebreus, que eram liderados por Caifás (Matti Sbraglia).', '2000-03-19', 6, 3, 'https://br.web.img3.acsta.net/medias/nmedia/18/90/65/02/20106873.jpg', '2024-11-01', '2024-11-01', true);

-- Inserir Atores em Filmes
INSERT INTO "MovieActor" ("movieId", "actorId") VALUES
(1, 1), (1, 2), (2, 2), (2, 4), (3, 4), (3, 5), (4, 1), (4, 2), (5, 6), (5, 3), 
(6, 7), (6, 9), (7, 1), (7, 8), (8, 3), (8, 6), (9, 7), (9, 5), (10, 2), (10, 4), 
(11, 1), (11, 5), (12, 4), (13, 6), (14, 7), (15, 3), (16, 9), (17, 8), (18, 10), (19, 5), 
(20, 2), (21, 3), (22, 4), (23, 11);  
-- Adicione mais relações de atores com filmes aqui