CREATE DATABASE box1;

use box1;

CREATE TABLE box1 (
    pop VARCHAR(255) NOT NULL,
    number int NOT NULL,
    price VARCHAR(255) NOT NULL,
    auto BOOLEAN,
    PRIMARY KEY (pop, number)
);

INSERT INTO box1
VALUES(
    'example1',
    1,
    '200',
    true
);

INSERT INTO box1
VALUES(
    'example2',
    2,
    '100',
    true
);

INSERT INTO box1
VALUES(
    'example3',
    2,
    '100',
    true
);

CREATE TABLE box2 (
    pop VARCHAR(255) NOT NULL,
    number int NOT NULL,
    price VARCHAR(255) NOT NULL,
    auto BOOLEAN,
    PRIMARY KEY (pop, number)
);

INSERT INTO box2
VALUES(
    'example4',
    1,
    '200',
    true
);

INSERT INTO box2
VALUES(
    'example5',
    2,
    '100',
    true
);

INSERT INTO box2
VALUES(
    'example6',
    2,
    '100',
    true
);