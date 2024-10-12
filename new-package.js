import fs from 'node:fs';
import { dirname, join } from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

// Obtener __dirname para ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Interfaz para capturar el input del usuario
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// Pregunta al usuario por el nombre del nuevo paquete
rl.question('Nombre del nuevo paquete: ', (packageName) => {
	if (!packageName) {
		console.log('No se ha proporcionado un nombre.');
		rl.close();
		return;
	}

	// Ruta del nuevo paquete
	const packageDir = join(__dirname, './packages', packageName);

	// Verifica si ya existe la carpeta
	if (fs.existsSync(packageDir)) {
		console.log(`El paquete "${packageName}" ya existe.`);
		rl.close();
		return;
	}

	// Crear el directorio del paquete
	fs.mkdirSync(packageDir, { recursive: true });

	// Crear un package.json básico
	const packageJson = {
		name: `@repo/${packageName}`,
		version: '1.0.0',
		main: 'index.js',
		scripts: {},
		dependencies: {},
	};

	fs.writeFileSync(
		join(packageDir, 'package.json'),
		JSON.stringify(packageJson, null, 2),
	);

	// Crear un archivo index.ts básico (opcional)
	const indexFileContent = `// Archivo principal del paquete ${packageName}\n\nconsole.log('Hello from ${packageName}');\n`;

	fs.writeFileSync(join(packageDir, 'index.ts'), indexFileContent);

	// Crear un README.md (opcional)
	const readmeContent = `# ${packageName}\n\nEste es el paquete ${packageName}.\n`;

	fs.writeFileSync(join(packageDir, 'README.md'), readmeContent);

	console.log(`Paquete "${packageName}" creado exitosamente.`);

	rl.close();
});
