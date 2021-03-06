USE [agendalo]
GO
/****** Object:  Table [dbo].[Comercio]    Script Date: 3/5/2020 19:16:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comercio](
	[idComercio] [int] IDENTITY(1,1) NOT NULL,
	[numero] [int] NOT NULL,
	[razonSocial] [varchar](250) NOT NULL,
	[denominacion] [varchar](250) NOT NULL,
	[codigoPostal] [int] NOT NULL,
	[idProvincia] [int] NOT NULL,
	[telefono] [varchar](50) NULL,
	[direccion] [varchar](350) NULL,
	[email] [varchar](250) NULL,
	[cuit] [varchar](250) NOT NULL,
	[idRubro] [int] NOT NULL,
	[estado] [bit] NOT NULL,
	[fechaAlta] [datetime] NOT NULL,
 CONSTRAINT [PK_Comercio] PRIMARY KEY CLUSTERED 
(
	[idComercio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Provincia]    Script Date: 3/5/2020 19:16:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Provincia](
	[idProvincia] [int] IDENTITY(1,1) NOT NULL,
	[provincia] [varchar](250) NULL,
 CONSTRAINT [PK_Provincia] PRIMARY KEY CLUSTERED 
(
	[idProvincia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Rubro]    Script Date: 3/5/2020 19:16:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rubro](
	[idRubro] [int] IDENTITY(1,1) NOT NULL,
	[denominacion] [varchar](250) NULL,
 CONSTRAINT [PK_Rubro] PRIMARY KEY CLUSTERED 
(
	[idRubro] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 3/5/2020 19:16:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[idUsuario] [int] IDENTITY(1,1) NOT NULL,
	[email] [varchar](100) NULL,
	[clave] [varchar](100) NULL,
	[nombre] [varchar](100) NULL,
	[sku_id] [varchar](50) NULL,
	[apiAuthProvider] [varchar](250) NULL,
	[foto] [varchar](500) NULL,
	[Estado] [bit] NOT NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[idUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Comercio] ON 

INSERT [dbo].[Comercio] ([idComercio], [numero], [razonSocial], [denominacion], [codigoPostal], [idProvincia], [telefono], [direccion], [email], [cuit], [idRubro], [estado], [fechaAlta]) VALUES (1, 99999999, N'Macaco', N'Macaco', 8300, 1, N'44444440', N'san martin 689', N'maxi_gama@hotmail.com', N'20326565640', 3, 1, CAST(N'2020-05-02T00:00:00.000' AS DateTime))
INSERT [dbo].[Comercio] ([idComercio], [numero], [razonSocial], [denominacion], [codigoPostal], [idProvincia], [telefono], [direccion], [email], [cuit], [idRubro], [estado], [fechaAlta]) VALUES (2, 8888888, N'El Dante', N'El Dante', 8300, 1, N'555555', N'san martin 800', N'', N'545646465', 3, 1, CAST(N'2020-05-03T00:16:57.213' AS DateTime))
INSERT [dbo].[Comercio] ([idComercio], [numero], [razonSocial], [denominacion], [codigoPostal], [idProvincia], [telefono], [direccion], [email], [cuit], [idRubro], [estado], [fechaAlta]) VALUES (4, 2222222, N'Pintureria Mitre', N'Pintureria Mitre', 8300, 1, N'33222', N'san martin 22', N'', N'654554', 3, 1, CAST(N'2020-05-03T00:19:47.613' AS DateTime))
SET IDENTITY_INSERT [dbo].[Comercio] OFF
SET IDENTITY_INSERT [dbo].[Provincia] ON 

INSERT [dbo].[Provincia] ([idProvincia], [provincia]) VALUES (1, N'Neuquen')
INSERT [dbo].[Provincia] ([idProvincia], [provincia]) VALUES (2, N'Rio Negro')
SET IDENTITY_INSERT [dbo].[Provincia] OFF
SET IDENTITY_INSERT [dbo].[Rubro] ON 

INSERT [dbo].[Rubro] ([idRubro], [denominacion]) VALUES (1, N'Ferreteria')
INSERT [dbo].[Rubro] ([idRubro], [denominacion]) VALUES (2, N'Zapatillas')
INSERT [dbo].[Rubro] ([idRubro], [denominacion]) VALUES (3, N'Indumentaria')
SET IDENTITY_INSERT [dbo].[Rubro] OFF
SET IDENTITY_INSERT [dbo].[Usuario] ON 

INSERT [dbo].[Usuario] ([idUsuario], [email], [clave], [nombre], [sku_id], [apiAuthProvider], [foto], [Estado]) VALUES (1, N'maxi_gama@hotmail.com', NULL, N'Maxi Gamarra', N'10222512685142804', N'facebook', N'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10222512685142804&height=50&width=50&ext=1590807287&hash=AeQtfEvC3pw94Z4J', 1)
SET IDENTITY_INSERT [dbo].[Usuario] OFF
ALTER TABLE [dbo].[Comercio]  WITH CHECK ADD  CONSTRAINT [FK_Comercio_Provincia] FOREIGN KEY([idProvincia])
REFERENCES [dbo].[Provincia] ([idProvincia])
GO
ALTER TABLE [dbo].[Comercio] CHECK CONSTRAINT [FK_Comercio_Provincia]
GO
ALTER TABLE [dbo].[Comercio]  WITH CHECK ADD  CONSTRAINT [FK_Comercio_Rubro] FOREIGN KEY([idRubro])
REFERENCES [dbo].[Rubro] ([idRubro])
GO
ALTER TABLE [dbo].[Comercio] CHECK CONSTRAINT [FK_Comercio_Rubro]
GO
