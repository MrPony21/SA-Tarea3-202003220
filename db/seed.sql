INSERT INTO CITypes (Nombre, Descripcion) VALUES
  ('Servidor',       'Servidor físico o virtual'),
  ('BaseDatos',      'Instancia de base de datos'),
  ('Aplicación',     'Software o servicio desplegado'),
  ('DispositivoRed', 'Switch, Router, Firewall'),
  ('Almacenamiento', 'Storage SAN/NAS'),
  ('MáquinaVirtual', 'Máquina virtual en hipervisor');


INSERT INTO Environments (Nombre) VALUES
  ('DEV'),
  ('QA'),
  ('PROD');


INSERT INTO ConfigurationItems
  (Nombre, Descripcion, TipoCiId, AmbienteId, DireccionIp, SistemaOperativo, Fabricante)
VALUES
  ('Srv-DB-01', 'Servidor de base de datos principal',     1, 3, '10.0.0.10', 'Windows Server 2019', 'Dell'),
  ('DB-Inventory','Base de datos de inventario',           2, 3, NULL,               NULL,                      NULL),
  ('App-Frontend','Aplicación web de front-end',           3, 2, '10.0.1.15', 'Ubuntu 20.04',       'HP'),
  ('SW-Switch-01','Switch de distribución principal',      4, 1, '10.0.2.1',  NULL,                 'Cisco');



INSERT INTO CIRelationships (CiPadreId, CiHijoId, TipoRelacion)
VALUES
  (1, 2, 'DependeDe'),
  (1, 3, 'Implementa');


INSERT INTO ConfigurationItemAudit (CiId, Accion, Usuario)
VALUES
  (1, 'CREATE', 'seed_script'),
  (2, 'CREATE', 'seed_script'),
  (3, 'CREATE', 'seed_script'),
  (4, 'CREATE', 'seed_script');

