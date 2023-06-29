\echo 'Are you sure you want to delete and recreate the lifetracker database?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE lifetracker;
CREATE DATABASE lifetracker;
\connect lifetracker;

-- then you run the database script here: 
\i lifetracker-schema.sql