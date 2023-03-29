DROP TABLE IF EXISTS budgets;
DROP TABLE IF EXISTS plans;

CREATE TABLE budgets (
    budget_id SERIAL PRIMARY KEY,
    total_budget INT NOT NULL,
    budget_remaining INT NOT NULL
);

CREATE TABLE plans (
    plan_id SERIAL PRIMARY KEY,
    title VARCHAR(20) NOT NULL,
    cost INT NOT NULL,
    details VARCHAR(250)

);

INSERT INTO budgets(total_budget, budget_remaining)
VALUES (0, 0);