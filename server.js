const http = require('http');
const ExcelJS = require('exceljs');

const server = http.createServer(async (req, res) => {

  // Validación de ruta
  if (req.url !== '/reporte') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('Visita /reporte para descargar el Excel');
  }

  try {
    // Crear workbook en memoria
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Ventas');

    // Cabecera: aqui puedes agregar lo que deseas crear
    worksheet.addRow(['Producto', 'Cantidad', 'Precio']);

    // Datos (20 filas)
    for (let i = 1; i <= 20; i++) {
      worksheet.addRow([
        `Producto ${i}`,
        Math.floor(Math.random() * 10) + 1,
        (Math.random() * 100).toFixed(2)
      ]);
    }

    // Cabeceras HTTP para descarga
    res.writeHead(200, {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="reporte.xlsx"'
    });

    // Enviar Excel en streaming
    await workbook.xlsx.write(res);

    // Cerrar respuesta
    res.end();

  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Error al generar el archivo');
  }

});

server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});