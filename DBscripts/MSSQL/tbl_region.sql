DELETE  FROM region;
GO

DBCC CHECKIDENT (region, RESEED, 0)
/*For MySQL:  ALTER TABLE tablename AUTO_INCREMENT = 1*/ 
GO

INSERT INTO region (region_value, region_label)
VALUES ('BW', N'Baden-Württemberg 巴登-符騰堡' )
GO

INSERT INTO region (region_value, region_label)
VALUES ('BE', N'Berlin 柏林' )
GO

INSERT INTO region (region_value, region_label)
VALUES ('BY', N'Bavaria 巴伐利亞' )
GO

INSERT INTO region (region_value, region_label)
VALUES ('HB', N'Bremen 布萊梅' )
GO

INSERT INTO region (region_value, region_label)
VALUES ('BB', N'Brandenburg 布蘭登堡' )
GO

INSERT INTO region (region_value, region_label)
VALUES ('HH', N'Hamburg 漢堡')
GO

INSERT INTO region (region_value, region_label)
VALUES ('HE', N'Hessen 黑森' )
GO

INSERT INTO region (region_value, region_label)
VALUES ('NI', N'Lower Saxony 下薩克森')
GO

INSERT INTO region (region_value, region_label)
VALUES ('SL', N'Saarland 薩爾蘭')
GO

INSERT INTO region (region_value, region_label)
VALUES ('SN', N'Saxony 薩克森')
GO

INSERT INTO region (region_value, region_label)
VALUES ('ST', N'Saxony-Anhalt 薩克森-安哈特')
GO

INSERT INTO region (region_value, region_label)
VALUES ('TH', N'Thuringia 圖林根')
GO

INSERT INTO region (region_value, region_label)
VALUES ('RP', N'Rhineland-Palatinate 萊茵蘭-普法茲')
GO

INSERT INTO region (region_value, region_label)
VALUES ('SH', N'Schleswig-Holstein 史列斯威-霍爾斯')
GO

INSERT INTO region (region_value, region_label)
VALUES ('NW', N'North Rhine-Westphalia 北萊茵-西法冷')
GO

INSERT INTO region (region_value, region_label)
VALUES ('MV', N'Mecklenburg-Western Pomerania 梅克倫堡-西波美恩')
GO
