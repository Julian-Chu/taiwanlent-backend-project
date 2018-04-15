DELETE  FROM subject;
GO

DBCC CHECKIDENT (subject, RESEED, 0)
/*For MySQL:  ALTER TABLE tablename AUTO_INCREMENT = 1*/ 
GO

INSERT INTO subject (value, label)
VALUES ('etit', N'電機資訊');
GO

INSERT INTO subject (value, label)
VALUES ('ch', N'化學化工')
GO

INSERT INTO subject (value, label)
VALUES ('mame', N'材料機械')
GO

INSERT INTO subject (value, label)
VALUES ('soci', N'社會科學')
GO

INSERT INTO subject (value, label)
VALUES ('lang', N'語言專業')
GO

INSERT INTO subject (value, label)
VALUES ('art', N'藝術')
GO

INSERT INTO subject (value, label)
VALUES ('biomed', N'生物醫學')
GO

INSERT INTO subject (value, label)
VALUES ('etc', N'其他')
GO
