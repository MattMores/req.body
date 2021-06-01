psql -c "CREATE USER req_body_app WITH PASSWORD 'password' CREATEDB"
psql -c "CREATE DATABASE req_body_db WITH OWNER req_body_app"
