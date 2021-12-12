create table if not exists user
(
    id         varchar(36)                                          not null,
    name       text                                                 not null,
    email      text                                                 not null,
    password   text                                                 not null,
    role       enum ('user', 'contributor', 'admin') default 'user' not null,
    created_at timestamp                                            not null,
    primary key (id)
);

create table if not exists skill
(
    id             varchar(36)                            not null,
    name           text                                   not null,
    description    text                                   not null,
    difficulty     decimal(2, 1)                          not null,
    fig_shorthand  text                                   null,
    end_position   enum ('feet', 'seat', 'back', 'front') not null,
    start_position enum ('feet', 'seat', 'back', 'front') not null,
    created_by     varchar(36)                            not null,
    updated_by     varchar(36)                            not null,
    updated_at     timestamp                              not null,
    created_at     timestamp                              not null,
    primary key (id)
);

create table if not exists routine
(
    id         varchar(36) not null,
    user       varchar(36) not null,
    name       text        not null,
    created_at timestamp   not null,
    updated_at timestamp   not null,
    constraint routine_id_uindex
        unique (id)
);

create table if not exists routine_skill
(
    id      varchar(36) not null,
    skill   varchar(36) not null,
    routine varchar(36) not null,
    constraint routine_skill_id_uindex
        unique (id),
    constraint routine_skill_routine_id_fk
        foreign key (routine) references routine (id),
    constraint routine_skill_skill_id_fk
        foreign key (skill) references skill (id),
    primary key (id)
);
