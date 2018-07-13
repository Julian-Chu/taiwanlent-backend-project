SET search_path TO taiwanlent;

DELETE  FROM taiwanlent.subject;

INSERT INTO taiwanlent.subject (subject_value, subject_label)
VALUES ('etit', N'電機資訊');

INSERT INTO taiwanlent.subject (subject_value, subject_label)
VALUES ('ch', N'化學化工');

INSERT INTO taiwanlent.subject (subject_value, subject_label)
VALUES ('mame', N'材料機械');

INSERT INTO taiwanlent.subject (subject_value, subject_label)
VALUES ('soci', N'社會科學');

INSERT INTO taiwanlent.subject (subject_value, subject_label)
VALUES ('lang', N'語言專業');

INSERT INTO taiwanlent.subject (subject_value, subject_label)
VALUES ('art', N'藝術');

INSERT INTO taiwanlent.subject (subject_value, subject_label)
VALUES ('biomed', N'生物醫學');

INSERT INTO taiwanlent.subject (subject_value, subject_label)
VALUES ('etc', N'其他');

