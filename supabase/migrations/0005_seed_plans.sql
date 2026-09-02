-- 0005_seed_plans.sql
-- Catálogo de planes. MISMOS límites que el frontend (PLANS en app.js).
-- Si cambias un límite, cámbialo en los dos sitios (o mejor: haz que el frontend
-- lea /rest/v1/plans al arrancar — ver DEPLOY.md paso 9).

insert into public.plans (key, name, price_month, price_year, sort_order, limits, features) values
('free', 'Zynqora Free', 0, 0, 0,
  '{"aiMessages":20,"files":3,"tests":5,"flashcards":20,"podcasts":0,"presentations":0,"conceptMaps":0,"subjects":3}',
  '{"ads":false,"personalization":"basic","review":true,"languages":true}'
),
('plus', 'Zynqora Plus', 7.99, 79.99, 1,
  '{"aiMessages":300,"files":30,"tests":50,"flashcards":200,"podcasts":10,"presentations":5,"conceptMaps":20,"subjects":10}',
  '{"ads":false,"personalization":"full","review":true,"languages":true}'
),
('pro', 'Zynqora Pro', 14.99, 149.99, 2,
  '{"aiMessages":1000,"files":100,"tests":200,"flashcards":1000,"podcasts":30,"presentations":20,"conceptMaps":100,"subjects":null}',
  '{"ads":false,"personalization":"full","review":true,"languages":true,"aiAdvanced":true}'
)
on conflict (key) do update
  set name = excluded.name, price_month = excluded.price_month, price_year = excluded.price_year,
      limits = excluded.limits, features = excluded.features, sort_order = excluded.sort_order;
