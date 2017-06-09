	CREATE USER 'scheduler'@'localhost' IDENTIFIED BY 'scheduler';
GRANT ALL PRIVILEGES ON scheduler.* TO 'scheduler'@'localhost';
