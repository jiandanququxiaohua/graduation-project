USE [clothes]
GO
/****** Object:  Table [dbo].[chuanda]    Script Date: 2019/5/16 0:35:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[chuanda](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[styleId] [varchar](50) NULL,
	[label] [varchar](50) NULL,
	[overskirt] [varchar](50) NULL,
	[handbag] [varchar](50) NULL,
	[cardigan] [varchar](50) NULL,
	[trouser] [varchar](50) NULL,
	[dress] [varchar](50) NULL,
	[underwear] [varchar](50) NULL,
	[makeup] [varchar](50) NULL,
	[coat] [varchar](50) NULL,
	[shoe] [varchar](50) NULL,
	[other] [varchar](50) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[cloth]    Script Date: 2019/5/16 0:35:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[cloth](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userId] [varchar](50) NOT NULL,
	[clothTypeId] [varchar](50) NOT NULL,
	[clothName] [varchar](50) NULL,
	[price] [varchar](50) NULL,
	[brand] [varchar](50) NULL,
	[fabric] [varchar](50) NULL,
	[season] [varchar](50) NULL,
	[size] [varchar](50) NULL,
	[color] [varchar](50) NULL,
	[imgUrl] [varchar](50) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[clothType]    Script Date: 2019/5/16 0:35:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[clothType](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[type] [varchar](50) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[collection]    Script Date: 2019/5/16 0:35:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[collection](
	[id] [int] NOT NULL,
	[clothId] [varchar](50) NULL,
	[startTime] [varchar](50) NULL,
	[endTime] [varchar](50) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[figure]    Script Date: 2019/5/16 0:35:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[figure](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userId] [varchar](50) NULL,
	[weight] [varchar](50) NULL,
	[stature] [varchar](50) NULL,
	[chestSize] [varchar](50) NULL,
	[waistSize] [varchar](50) NULL,
	[hiplineSize] [varchar](50) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[share]    Script Date: 2019/5/16 0:35:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[share](
	[id] [int] NULL,
	[clothId] [varchar](50) NULL,
	[date] [varchar](50) NULL,
	[shareNum] [varchar](50) NULL,
	[descript] [varchar](50) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[stature]    Script Date: 2019/5/16 0:35:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[stature](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userId] [varchar](50) NULL,
	[height] [varchar](50) NULL,
	[weight] [varchar](50) NULL,
	[circumference] [varchar](50) NULL,
	[waistline] [varchar](50) NULL,
	[hipline] [varchar](50) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[style]    Script Date: 2019/5/16 0:35:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[style](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[sname] [varchar](50) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[user]    Script Date: 2019/5/16 0:35:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[user](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userName] [nvarchar](50) NULL,
	[password] [varchar](50) NULL,
	[age] [varchar](50) NULL,
	[alias] [nvarchar](200) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'用户id' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'user', @level2type=N'COLUMN',@level2name=N'id'
GO
