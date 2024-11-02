DELETE FROM "AvailableAction";
DELETE FROM "AvailableTrigger";

INSERT INTO "AvailableAction" (id, name , requiredfields ) values ( 'ec74c909-070a-4884-8318-5c813625d597', 'email' , '{"SMTP_HOST":"", "SMTP_PASS":"" , "SMTP_USER":""}');
INSERT INTO "AvailableTrigger" (id,  name) values ('4d65b427-c339-48d7-bd78-4395a31da46a', 'webhook') 