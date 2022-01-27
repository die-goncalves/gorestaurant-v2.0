begin;

create table if not exists public.restaurants (
    id uuid default uuid_generate_v4() not null,
    name text,
    phone_number text,
    coordinates json,
    address text,
    image text,
    place text,
    description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

    primary key (id)
);

create table if not exists public.foods (
    id uuid default uuid_generate_v4() not null,
    restaurant_id uuid not null,
    name text,
    price numeric,
    image text,
    description text,
    tag text,
    stripe_food_id text,
    stripe_price_id text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

    primary key (id)
);

create table if not exists public.food_rating (
    food_id uuid not null,
    customer_id uuid not null,
    rating numeric,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

    primary key (food_id, customer_id)
);

create table if not exists public.stripe_customer (
    customer_id uuid not null,
    stripe_customer_id text,

    primary key (customer_id)
);

create table if not exists public.orders (
    payment_intent_id text not null,
    customer_id uuid not null,
    line_items json,
    payment_intent_status text,
    shipping_options json,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

    primary key (payment_intent_id)
);

create type weekday_enum as enum ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
create table if not exists public.operating_hours (
    id uuid default uuid_generate_v4() not null,
    restaurant_id uuid not null,
	weekday weekday_enum,
    start_hour time without time zone,
    end_hour time without time zone,

    primary key (id)
);

alter table if exists public.foods
    add foreign key (restaurant_id)
    references public.restaurants (id) MATCH simple
    on update no action
    on delete cascade
    not valid;


alter table if exists public.food_rating
    add foreign key (customer_id)
    references auth.users (id) MATCH simple
    on update no action
    on delete cascade
    not valid;


alter table if exists public.food_rating
    add foreign key (food_id)
    references public.foods (id) MATCH simple
    on update no action
    on delete cascade
    not valid;


alter table if exists public.stripe_customer
    add foreign key (customer_id)
    references auth.users (id) MATCH simple
    on update no action
    on delete cascade
    not valid;


alter table if exists public.orders
    add foreign key (customer_id)
    references auth.users (id) MATCH simple
    on update no action
    on delete cascade
    not valid;


alter table if exists public.operating_hours
    add foreign key (restaurant_id)
    references public.restaurants (id) MATCH simple
    on update no action
    on delete cascade
    not valid;

end;