#!/bin/sh
 (echo "BEGIN;"; cat ./src/db/schemas/schema.sql; cat ./src/db/schemas/albums.sql; cat ./src/db/schemas/users.sql; cat ./src/db/schemas/reviews.sql; echo "COMMIT;") \
 | psql -h ec2-54-221-198-206.compute-1.amazonaws.com -U xykwprtlvbmniu -d d2ctimk08tvedh

#eof