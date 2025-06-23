CREATE DATABASE Tarea3;
USE Tarea3;


CREATE TABLE ConfigurationItems (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(255) NULL,
    TipoCiId INT NOT NULL,                 
    AmbienteId INT NOT NULL,               
    DireccionIp VARCHAR(45) NULL,          
    SistemaOperativo NVARCHAR(50) NULL,    
    Fabricante NVARCHAR(100) NULL,         
    FechaCreacion DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    FechaModificacion DATETIME2 NULL,
    Activo BIT NOT NULL DEFAULT 1         
);

CREATE TABLE CITypes (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(50) NOT NULL UNIQUE,  
    Descripcion NVARCHAR(100) NULL
);

CREATE TABLE Environments (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(20) NOT NULL UNIQUE   
);

CREATE TABLE CIRelationships (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    CiPadreId INT NOT NULL,                
    CiHijoId INT NOT NULL,                 
    TipoRelacion NVARCHAR(50) NOT NULL,    
    FechaRelacion DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_CIRel_CiPadre FOREIGN KEY (CiPadreId) REFERENCES ConfigurationItems(Id),
    CONSTRAINT FK_CIRel_CiHijo FOREIGN KEY (CiHijoId)  REFERENCES ConfigurationItems(Id)
);


CREATE TABLE ConfigurationItemAudit (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    CiId INT NOT NULL,                      
    Accion NVARCHAR(20) NOT NULL,           
    Usuario NVARCHAR(100) NOT NULL,        
    FechaAccion DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Audit_Ci FOREIGN KEY (CiId) REFERENCES ConfigurationItems(Id)
);